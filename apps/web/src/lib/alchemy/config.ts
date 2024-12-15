import { alchemy, shape } from '@account-kit/infra';
import { cookieStorage, createConfig } from '@account-kit/react';
import { createConfig as createWagmiConfig, http } from 'wagmi';

export const wagmiConfig = createWagmiConfig({
  chains: [shape],
  transports: {
    [shape.id]: http(
      `https://shape-mainnet.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_API_KEY}`
    ),
  },
});

export const config = createConfig(
  {
    transport: alchemy({ apiKey: import.meta.env.VITE_ALCHEMY_API_KEY }),
    chain: shape,
    // policyId: import.meta.env.VITE_GAS_SPONSORSHIP_ID,
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

export const gameContract = {
  address: '0xbBb26a53E35e707A5cf7483dBA7402e796071690' as `0x${string}`,
  // prettier-ignore
  abi :[{"type":"constructor","inputs":[{"name":"_initialOwner","type":"address","internalType":"address"},{"name":"_gasback","type":"address","internalType":"address"}],"stateMutability":"nonpayable"},{"type":"function","name":"addPlayScore","inputs":[{"name":"record","type":"tuple","internalType":"struct DarkestDungeon.PlayRecord","components":[{"name":"id","type":"string","internalType":"string"},{"name":"timestamp","type":"uint256","internalType":"uint256"},{"name":"totalRounds","type":"uint256","internalType":"uint256"},{"name":"totalScore","type":"uint256","internalType":"uint256"}]},{"name":"times","type":"tuple[]","internalType":"struct DarkestDungeon.RoundTime[]","components":[{"name":"startTime","type":"uint256","internalType":"uint256"},{"name":"endTime","type":"uint256","internalType":"uint256"},{"name":"round","type":"uint256","internalType":"uint256"}]},{"name":"player","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"gasback","inputs":[],"outputs":[{"name":"","type":"address","internalType":"contract IGasback"}],"stateMutability":"view"},{"type":"function","name":"getPlayRecords","inputs":[{"name":"player","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"tuple[]","internalType":"struct DarkestDungeon.PlayRecordWithTimes[]","components":[{"name":"id","type":"string","internalType":"string"},{"name":"record","type":"tuple","internalType":"struct DarkestDungeon.PlayRecord","components":[{"name":"id","type":"string","internalType":"string"},{"name":"timestamp","type":"uint256","internalType":"uint256"},{"name":"totalRounds","type":"uint256","internalType":"uint256"},{"name":"totalScore","type":"uint256","internalType":"uint256"}]},{"name":"times","type":"tuple[]","internalType":"struct DarkestDungeon.RoundTime[]","components":[{"name":"startTime","type":"uint256","internalType":"uint256"},{"name":"endTime","type":"uint256","internalType":"uint256"},{"name":"round","type":"uint256","internalType":"uint256"}]}]}],"stateMutability":"view"},{"type":"function","name":"owner","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"playRecords","inputs":[{"name":"","type":"address","internalType":"address"},{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"id","type":"string","internalType":"string"},{"name":"timestamp","type":"uint256","internalType":"uint256"},{"name":"totalRounds","type":"uint256","internalType":"uint256"},{"name":"totalScore","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"registerForGasback","inputs":[],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"roundTimes","inputs":[{"name":"","type":"string","internalType":"string"},{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"startTime","type":"uint256","internalType":"uint256"},{"name":"endTime","type":"uint256","internalType":"uint256"},{"name":"round","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"event","name":"PlayRecordAdded","inputs":[{"name":"record","type":"tuple","indexed":false,"internalType":"struct DarkestDungeon.PlayRecord","components":[{"name":"id","type":"string","internalType":"string"},{"name":"timestamp","type":"uint256","internalType":"uint256"},{"name":"totalRounds","type":"uint256","internalType":"uint256"},{"name":"totalScore","type":"uint256","internalType":"uint256"}]},{"name":"times","type":"tuple[]","indexed":false,"internalType":"struct DarkestDungeon.RoundTime[]","components":[{"name":"startTime","type":"uint256","internalType":"uint256"},{"name":"endTime","type":"uint256","internalType":"uint256"},{"name":"round","type":"uint256","internalType":"uint256"}]},{"name":"player","type":"address","indexed":false,"internalType":"address"}],"anonymous":false}] as const,
};
