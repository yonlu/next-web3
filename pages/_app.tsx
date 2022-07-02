import { ChakraProvider } from '@chakra-ui/react';
import { NETWORKS, Provider } from '@web3-ui/core';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
  [chain.rinkeby],
  [alchemyProvider({ alchemyId: process.env.ALCHEMY_API }), publicProvider()]
);
const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains,
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} showRecentTransactions={true}>
          <Provider network={NETWORKS.rinkeby}>
            <Component {...pageProps} />
          </Provider>
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  );
}

export default MyApp;
