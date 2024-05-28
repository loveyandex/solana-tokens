import { createMint, getMint } from '@solana/spl-token';
import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL } from '@solana/web3.js';

const payer = Keypair.generate();

console.log(payer)
console.log(payer.publicKey.toBase58())


const mintAuthority = Keypair.generate();
const freezeAuthority = Keypair.generate();

const connection = new Connection(
      clusterApiUrl('devnet'),
      'confirmed'
);

const mint = await createMint(
      connection,
      payer,
      mintAuthority.publicKey,
      freezeAuthority.publicKey,
      9 // We are using 9 to match the CLI decimal default exactly
);

console.log(mint.toBase58());
// AQoKYV7tYpTrFZN6P5oUufbQKAUr9mNYGe1TTJC9wajM

const mintInfo = await getMint(
      connection,
      mint
)

console.log(mintInfo.supply);


