import { useState } from 'react';

import { createFileRoute } from '@tanstack/react-router';

import { SignIn } from '~/components/sign-in';

export const HomeComponent = () => {
  const [gameStarted, setGameStarted] = useState(false);
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events -- safe to ignore
    <div
      className='!m-0 !p-0'
      onClick={() => {
        if (!gameStarted) {
          setGameStarted(true);
        }
      }}
    >
      <img
        alt='background'
        className='absolute h-screen w-full'
        src='/background.png'
      />
      <div className='absolute top-[18%] right-1/2 z-[1] translate-x-1/2'>
        <img alt='logo' className='max-w-2xl' src='/logo.png' />
      </div>
      <div className='absolute right-1/2 bottom-[20%] z-[1] translate-x-1/2'>
        {!gameStarted ? (
          <div className='animate-pulse text-neutral-400'>
            Click anywhere on the screen to start the game
          </div>
        ) : (
          <SignIn />
        )}
      </div>
    </div>
  );
};

export const Route = createFileRoute('/')({
  component: HomeComponent,
});
