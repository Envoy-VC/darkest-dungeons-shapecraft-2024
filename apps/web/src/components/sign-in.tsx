import { FcGoogle as GoogleIcon } from 'react-icons/fc';

import { useAuthenticate, useUser } from '@account-kit/react';

import { Button } from './ui/button';

export const SignIn = () => {
  const user = useUser();
  const { authenticate, isPending } = useAuthenticate();

  return (
    <Button
      className='flex h-12 flex-row items-center gap-2 rounded-xl font-medium [&_svg]:size-6'
      onClick={() => {
        authenticate({
          type: 'oauth',
          authProviderId: 'google',
          mode: 'redirect',
          redirectUrl: '/',
        });
      }}
    >
      <GoogleIcon size={100} />
      {isPending ? 'Signing in...' : 'Continue with Google'}
    </Button>
  );
};
