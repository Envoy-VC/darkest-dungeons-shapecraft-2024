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
      <Score />
      <div ref={gameContainerRef} id='game-container' />
    </div>
  );
};

export const Route = createFileRoute('/game')({
  component: GameComponent,
});

const Score = observer(() => {
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
    <div className='absolute top-4 right-4 z-[2] flex w-full max-w-sm flex-col gap-3 rounded-xl bg-accent p-4 text-xl'>
      <div>Score: {gameState.score}</div>
      <div>Player Health: {gameState.playerHealth}</div>
      <div>Player Lives: {gameState.totalLives}</div>
      <div>Current Level: {gameState.level}</div>
      <div>Current Round: {time ? (time / 1000).toFixed(2) : '0'} seconds</div>
      <button
        type='button'
        onClick={() => {
          console.log(
            gameState.times.map((time) => ({
              start: time.start,
              end: time.end,
              round: time.round,
            }))
          );
        }}
      >
        Log Rounds
      </button>
      <div className='flex flex-col'>
        {gameState.times
          .filter((time) => time.end !== undefined)
          .map((round) => {
            if (round.end) {
              return (
                <div key={round.round}>
                  Round {round.round}:{' '}
                  {((round.end - round.start) / 1000).toFixed(2)} seconds
                </div>
              );
            }

            return null;
          })}
      </div>
    </div>
  );
});
