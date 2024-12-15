import type { PropsWithChildren } from 'react';

import { config, wagmiConfig } from '~/lib/alchemy';

import { AlchemyAccountProvider } from '@account-kit/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';

export const queryClient = new QueryClient();

export const AlchemyProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig}>
        <AlchemyAccountProvider config={config} queryClient={queryClient}>
          {children}
        </AlchemyAccountProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
};
