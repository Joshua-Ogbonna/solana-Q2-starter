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
        const { uri } = await metaplex.nfts().uploadMetadata({
            name: 'Generug',
            symbol: 'GNG',
            description: 'Rug for sale',
            image: 'https://arweave.net/HZHvDIKvJGJPSggplY-16FhJ6ilQMv3DLkv193U9NWo',
            seller_fee_basis_points: 500,
            attributes: [
                {
                    trait_type: 'Primary color',
                    value: 'Green'
                },
                {
                    trait_type: 'Pattern',
                    value: 'Dotted'
                },
                {
                    trait_type: 'Secondary Colors',
                    value: 'Violet-Brown-Black'
                }
            ],
            properties: {
                files: [
                    {
                        type: 'image/png',
                        uri: 'https://arweave.net/HZHvDIKvJGJPSggplY-16FhJ6ilQMv3DLkv193U9NWo'
                    }
                ],
                creators: [
                    {
                        address: keypair.publicKey.toBase58(),
                        share: 100
                    }
                ]
            }
        })
        console.log('URI', uri)
    } catch (error) {
        console.log('Something went wrong', error)
    }
})()