import { useEffect, useRef } from 'react';

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
  return (
    <div className='absolute top-4 right-4 z-[2] flex flex-col gap-3 rounded-xl bg-accent p-4 text-xl'>
      <div>Score: {gameState.score}</div>
      <div>Player Health: {gameState.playerHealth}</div>
    </div>
  );
});
