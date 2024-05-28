import { createMint, getAccount, getMint, getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token';
import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL } from '@solana/web3.js';


(async () => {


      const payer = Keypair.generate();

      console.log(payer)
      console.log(payer.publicKey.toBase58())

      const connection = new Connection(
            clusterApiUrl('devnet'),
            'confirmed'
      );

      const airdropSignature = await connection.requestAirdrop(
            payer.publicKey,
            LAMPORTS_PER_SOL,
      );

      await connection.confirmTransaction(airdropSignature);

      let balance = await connection.getBalance(payer.publicKey)
      console.log("balance", balance);







      const mintAuthority = Keypair.generate();
      const freezeAuthority = Keypair.generate();

      const mint = await createMint(
            connection,
            payer,
            mintAuthority.publicKey,
            freezeAuthority.publicKey,
            9 // We are using 9 to match the CLI decimal default exactly
      );

      console.log(mint.toBase58());

      const mintInfo = await getMint(
            connection,
            mint
      )

      console.log(mintInfo.supply);
      // 0


      const tokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            payer,
            mint,
            payer.publicKey
          )
          
          console.log(tokenAccount.address.toBase58());
          // 7UX2i7SucgLMQcfZ75s3VXmZZY4YRUyJN9X1RgfMoDUi

          const tokenAccountInfo = await getAccount(
            connection,
            tokenAccount.address
          )
          
          console.log(tokenAccountInfo.amount);
          // 0

          await mintTo(
            connection,
            payer,
            mint,
            tokenAccount.address,
            mintAuthority,
            100_000_000_000_000_000_000_000_000 // because decimals for the mint are set to 9 
          )

          const mintInfo2 = await getMint(
            connection,
            mint
          )
          
          console.log(mintInfo2.supply);
          // 100
          
          const tokenAccountInfo2 = await getAccount(
            connection,
            tokenAccount.address
          )
          
          console.log(tokenAccountInfo2.amount);
          // 100


})()