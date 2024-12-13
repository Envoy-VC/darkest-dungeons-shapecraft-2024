import { useEffect, useRef } from 'react';

import { createFileRoute } from '@tanstack/react-router';

import { phaserGame } from '~/components/game';

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

  return <div ref={gameContainerRef} id='game-container' />;
};

export const Route = createFileRoute('/game')({
  component: GameComponent,
});
