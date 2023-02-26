import {useState} from 'react'; 
import { ConnectWallet, useAddress, useClaimToken, useDisconnect, useMetamask, useCoinbaseWallet, useTokenBalance, useTokenDrop, useTokenSupply } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import Image from 'next/image';
import token from "../styles/assets/token.png"; 
import {motion} from 'framer-motion'; 

export default function Home() {

  const [amount, setAmount] = useState(""); 
  const address = useAddress(); 
  const connectWithMetamask = useMetamask();
  const connectWithCoinbaseWallet = useCoinbaseWallet(); 
  const disconnectWallet = useDisconnect(); 
  const tokenDrop = useTokenDrop("0xfB608A51582c0b2995c088025E3B5dC40Bd79ea5"); 
  const {data: tokenSupply } = useTokenSupply(tokenDrop); 
  const {data: tokenBalance } = useTokenBalance(tokenDrop, address); 
  const {mutate: claimTokens, isLoading} = useClaimToken(tokenDrop)


  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h2>Welcome to Skillbridge DApp</h2>
        <p> <i>For more security and transparency, experiment the Web3 wave with our Native Token</i></p>
       
      
       
      {address ? (
<> 

<h1 className={styles.title} > Skillbridge ERC20 Token </h1>
<p>Your address: {address}</p>
<p>Total Token Supply: {tokenSupply?.displayValue} {tokenSupply?.symbol}</p>
<p>Your Token Balance: {tokenBalance?.displayValue} {tokenBalance?.symbol}</p>
<h2>Claim Tokens 💸</h2>
<input type="number" value={amount} onChange={e => setAmount(e.target.value)}></input>
<button onClick={() => claimTokens({amount, to: address}, {onSuccess: ()=> setAmount('')})} 
disabled={isLoading}>Claim {amount} {tokenBalance?.symbol}</button> 
<br></br>
<button onClick={disconnectWallet}>Disconnect Wallet</button>

</>

      ) : (
       
        <>
     <div>
        <Image src={token} className='App-logo' alt='/' 
        width='400'
        height='400'
        />
      </div>
      
        <button className={styles.grid} onClick={connectWithMetamask}>Connect with Metamask Wallet 🦊 </button>
        <br></br>
        <button className={styles.grid} onClick={connectWithCoinbaseWallet}>Connect with Coinbase Wallet 🔵 </button>
        
        </>  

      )

      }
    
      </main>
    </div>
    
  );
}
