import { NETWORKS, Provider } from '@web3-ui/core';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import '../styles/globals.css';
import { PreviewProvider } from '../hooks/usePreview';

const { chains, provider } = configureChains(
  [chain.rinkeby],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_API }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'Natured Developers Mint Dapp',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} showRecentTransactions={true}>
          <Provider network={NETWORKS.rinkeby}>
            <PreviewProvider>
              <Component {...pageProps} />
            </PreviewProvider>
          </Provider>
        </RainbowKitProvider>
      </WagmiConfig>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
