import type { PropsWithChildren } from 'react';

import { AlchemyProvider } from './alchemy-provider';

export const ProviderTree = ({ children }: PropsWithChildren) => {
  return <AlchemyProvider>{children}</AlchemyProvider>;
};
