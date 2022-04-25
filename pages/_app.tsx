import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider, NETWORKS } from '@web3-ui/core';
import { ChakraProvider } from '@chakra-ui/react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Provider network={NETWORKS.rinkeby}>
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;
