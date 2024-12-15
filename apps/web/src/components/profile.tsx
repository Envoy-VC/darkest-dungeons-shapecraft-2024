import { useQuery } from '@tanstack/react-query';
import { useGameActions } from '~/hooks';

import { LoadingOverlay } from './loading-overlay';
import { ProfileTable } from './profile-table';

export const ProfileDetails = () => {
  const { getProfileData, isLoadingClient } = useGameActions();

  const { data: details, isLoading } = useQuery({
    queryKey: ['profileData'],
    queryFn: getProfileData,
    enabled: !isLoadingClient,
  });

  if (isLoadingClient || isLoading) return <LoadingOverlay />;

  return (
    <div className='absolute top-24 right-1/2 mx-auto w-full max-w-screen-xl translate-x-1/2 rounded-xl bg-[#0b171dd0] px-8 py-6'>
      <div className='font-golondrina text-7xl'>Profile Details</div>
      <ProfileTable
        // @ts-expect-error -- safe for read-only
        data={details ?? []}
      />
    </div>
  );
};
