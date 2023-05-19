import { Keypair, Commitment, Connection, PublicKey } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo, transfer } from "@solana/spl-token";
import wallet from '../dev-wallet.json'

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet))
const commitment: Commitment = 'confirmed'

const connection = new Connection('https://api.devnet.solana.com', commitment);

// Mint address
const mint = new PublicKey("Erqa9eccJDSZgoX8dYMMupVwo276f7un1Wrs2mDgQ7C5")

// Recipient address
const to = new PublicKey("3CSYbxHBNDDXJgVhRALSrxckmui2RjHkPwGgwajVp4UM");

(async () => {
    try {
        const fromAta = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, keypair.publicKey)

        const toAta = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, to)

        const tx = await transfer(connection, keypair, fromAta.address, toAta.address, keypair, 1 * 10 ** 6)
        console.log(`https://explorer.solana.com/tx/${tx}?cluster=devnet`)
    } catch (error) {
        console.error(`Oops, something went wrong: ${error}`)
    }
})()