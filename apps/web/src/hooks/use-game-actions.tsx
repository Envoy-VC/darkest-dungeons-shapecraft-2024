import { gameContract, wagmiConfig } from '~/lib/alchemy';

import {
  useSendUserOperation,
  useSmartAccountClient,
} from '@account-kit/react';
import { readContract } from '@wagmi/core';
import { encodeFunctionData } from 'viem';

export interface StoreArgs {
  id: string;
  totalScore: bigint;
  times: { startTime: bigint; endTime: bigint; round: bigint }[];
}

export const useGameActions = () => {
  const { client, address, isLoadingClient, error } = useSmartAccountClient({
    type: 'LightAccount',
  });

  const getProfileData = async () => {
    // @ts-expect-error -- safe to ignore
    const res = await readContract(wagmiConfig, {
      ...gameContract,
      functionName: 'getPlayRecords',
      args: [address],
    });

    return res.toReversed();
  };

  const { sendUserOperationAsync } = useSendUserOperation({
    client,
    waitForTxn: true,
  });

  const storeResult = async (args: StoreArgs) => {
    while (isLoadingClient) {
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
    }
    if (!address) {
      throw new Error('No address');
    }
    const data = encodeFunctionData({
      abi: gameContract.abi,
      functionName: 'addPlayScore',
      args: [
        {
          id: args.id,
          totalScore: args.totalScore,
          totalRounds: BigInt(args.times.length),
          timestamp: BigInt(Date.now()),
        },
        args.times,
        address,
      ],
    });

    const res = await sendUserOperationAsync({
      uo: {
        target: gameContract.address,
        data,
        value: 0n,
      },
    });

    return res.hash as string;
  };

  return { storeResult, isLoadingClient, error, client, getProfileData };
};
