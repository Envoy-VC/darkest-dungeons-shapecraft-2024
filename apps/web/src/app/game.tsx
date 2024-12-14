import { useEffect, useRef, useState } from 'react';

import { createFileRoute } from '@tanstack/react-router';
import { observer } from 'mobx-react-lite';

import { phaserGame } from '~/components/game';
import { gameState } from '~/components/game/state';

export const GameComponent = () => {
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const phaserGameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (gameContainerRef.current) {
      phaserGameRef.current = phaserGame;
    }

    return () => {
      if (phaserGameRef.current) {
        phaserGameRef.current.destroy(true);
        phaserGameRef.current = null;
      }
    };
  }, []);

  return (
    <div>
      <GameDetails />
      <div ref={gameContainerRef} id='game-container' />
    </div>
  );
};

export const Route = createFileRoute('/game')({
  component: GameComponent,
});

const GameDetails = observer(() => {
  if (gameState.activeScene === 'game')
    return (
      <>
        <PlayerHealth />
        <PlayerScore />
        <RoundTimer />
        <CurrentRound />
      </>
    );
});

const RoundTimer = observer(() => {
  const currentRound = gameState.times.find((t) => t.round === gameState.level);

  const [time, setTime] = useState<number>(0);

  // create a timer on if time is not null
  useEffect(() => {
    if (currentRound) {
      const interval = setInterval(() => {
        setTime(Date.now() - currentRound.start);
      }, 100);

      return () => {
        clearInterval(interval);
      };
    }
  }, [currentRound]);

  return (
    <div className='absolute bottom-4 left-4'>
      <div className='text-xl'>
        Current Round: {time ? (time / 1000).toFixed(2) : '0'} seconds
      </div>
    </div>
  );
});

const PlayerHealth = observer(() => {
  const totalLives = Array.from({ length: gameState.totalLives }, (_, i) => i);

  return (
    <div className='absolute top-4 left-4 flex flex-col gap-4'>
      <div className='flex flex-row items-center gap-4'>
        {totalLives.map((_, i) => (
          <img
            key={`heart-${String(i)}`}
            alt='heart'
            className='h-8 w-8'
            src='/heart.png'
          />
        ))}
      </div>
      <div className='flex h-2 w-[200px] items-center justify-start rounded-[6px] bg-accent'>
        <div
          className='h-2 rounded-[5px] bg-red-500'
          style={{ width: `${String(gameState.playerHealth)}%` }}
        />
      </div>
    </div>
  );
});

const PlayerScore = observer(() => {
  return (
    <div className='absolute top-8 right-8 flex flex-col gap-4'>
      <div className='font-golondrina text-6xl'>{gameState.score}</div>
    </div>
  );
});

const CurrentRound = observer(() => {
  return (
    <div className='absolute top-12 right-1/2 flex translate-x-1/2 flex-col gap-4'>
      <div className='font-golondrina text-6xl'>Round: {gameState.level}</div>
    </div>
  );
});
