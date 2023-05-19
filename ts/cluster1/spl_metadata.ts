import { Keypair, Commitment, Connection, PublicKey, Transaction, sendAndConfirmRawTransaction, sendAndConfirmTransaction } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import { createCreateMetadataAccountV3Instruction } from "@metaplex-foundation/mpl-token-metadata"
import wallet from '../dev-wallet.json'

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet))
const commitment: Commitment = 'confirmed'

const connection = new Connection('https://api.devnet.solana.com', commitment);

// Define mint address
const mint = new PublicKey("Erqa9eccJDSZgoX8dYMMupVwo276f7un1Wrs2mDgQ7C5")

// token metadata program
const tokenMetaDataProgramId = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s")

// PDA for token metadata
const metadataSeeds = [
    Buffer.from("metadata"),
    tokenMetaDataProgramId.toBuffer(),
    mint.toBuffer()
]

const [metadataPDA, _bump] = PublicKey.findProgramAddressSync(metadataSeeds, tokenMetaDataProgramId);

(async () => {
    try {
        const [metadataPDA] = PublicKey.findProgramAddressSync(metadataSeeds, tokenMetaDataProgramId)
        const transaction = new Transaction().add(
            createCreateMetadataAccountV3Instruction({
                metadata: metadataPDA,
                mint,
                mintAuthority: keypair.publicKey,
                payer: keypair.publicKey,
                updateAuthority: keypair.publicKey
            }, {
                createMetadataAccountArgsV3: {
                    data: {
                        name: 'Jaykes Coin',
                        symbol: 'JAC',
                        uri: '',
                        sellerFeeBasisPoints: 0,
                        creators: [{ address: keypair.publicKey, verified: true, share: 100 }],
                        collection: null,
                        uses: null
                    },
                    isMutable: true,
                    collectionDetails: null
                }
            })
        );
        const tx = await sendAndConfirmTransaction(connection, transaction, [keypair])
        console.log(`https://explorer.solana.com/tx/${tx}?cluster=devnet`)
    } catch (error) {
        console.error(`Oops, something went wrong: ${error}`)
    }
})()