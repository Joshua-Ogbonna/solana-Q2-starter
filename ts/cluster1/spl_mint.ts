import { Keypair, Commitment, Connection, PublicKey } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import wallet from '../dev-wallet.json'

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet))
const commitment: Commitment = 'confirmed'

const connection = new Connection('https://api.devnet.solana.com', commitment);
const mint = new PublicKey("Erqa9eccJDSZgoX8dYMMupVwo276f7un1Wrs2mDgQ7C5");

const token_decimals = 1_000_000n;

(async () => {
    try {
        const tokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            keypair.publicKey
        )
        console.log(`Your ata is: ${tokenAccount.address.toBase58()}`);


        const mintTx = await mintTo(connection, keypair, mint, tokenAccount.address, keypair, 10*10**6)

        console.log(`Your mint txId is ${mintTx}`)
    } catch (error) {
        console.log(error)
    }
})()