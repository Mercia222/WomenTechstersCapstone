import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";


//Tesnet Network 
const activeChainId = ChainId.Goerli;

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider activeChain={activeChainId}>
      <Component {...pageProps} />
    </ThirdwebProvider>

  );
}

export default MyApp;
