import GridEngine from 'grid-engine';
import Phaser from 'phaser';

export type PhaserWithGridEngine = Phaser.Scene;

export const config = (
  preload: (this: Phaser.Scene) => void,
  create: (this: PhaserWithGridEngine) => void,
  update: (this: PhaserWithGridEngine) => void,
  parentRef?: string
): Phaser.Types.Core.GameConfig => {
  return {
    width: 800,
    height: 600,
    type: Phaser.AUTO,
    scene: {
      preload,
      create,
      update,
    },
    scale: {
      width: '100%',
      height: '100%',
    },
    parent: parentRef,
    pixelArt: true,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
      },
    },
  };
};
