import { alchemy, shapeSepolia } from '@account-kit/infra';
import { cookieStorage, createConfig } from '@account-kit/react';

export const config = createConfig(
  {
    transport: alchemy({ apiKey: import.meta.env.VITE_ALCHEMY_API_KEY }),
    chain: shapeSepolia,
    policyId: import.meta.env.VITE_GAS_SPONSORSHIP_ID,
    ssr: true,
    storage: cookieStorage,
    enablePopupOauth: false,
  },
  {
    auth: {
      sections: [
        [{ type: 'social', authProviderId: 'google', mode: 'popup' }],
        [
          {
            type: 'external_wallets',
            walletConnect: {
              projectId: import.meta.env.VITE_WALLET_CONNECT_ID,
            },
          },
        ],
      ],
      hideSignInText: false,
    },
  }
);
