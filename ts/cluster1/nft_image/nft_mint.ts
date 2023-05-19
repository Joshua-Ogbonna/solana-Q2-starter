import { Connection, Commitment, Keypair, clusterApiUrl } from "@solana/web3.js";
import wallet from '../../dev-wallet.json'
import { Metaplex, keypairIdentity, bundlrStorage, toMetaplexFile } from "@metaplex-foundation/js"

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet))
const committment: Commitment = "confirmed"
const connection = new Connection(clusterApiUrl("devnet"), committment)
const metaplex = Metaplex.make(connection).use(keypairIdentity(keypair)).use(bundlrStorage({
    address: 'https://devnet.bundlr.network',
    providerUrl: clusterApiUrl('devnet'),
    timeout: 60000
}));

(async () => {
    try {
        const { nft } = await metaplex.nfts().create({
            name: 'Generug',
            symbol: 'GNG',
            sellerFeeBasisPoints: 100,
            uri: 'https://arweave.net/lxKVqR9i5AzZiN4g1MPp5vkZGp6pw5drJvajCYTG9wo',
            isMutable: true
        })
        console.log('NFT address', nft.address.toBase58())
    } catch (error) {
        console.log('Something went wrong', error)
    }
})()