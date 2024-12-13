import { GridEngine } from 'grid-engine';
import Phaser from 'phaser';

export type PhaserWithGridEngine = Phaser.Scene & { gridEngine?: GridEngine };

export const config = (
  preload: (this: Phaser.Scene) => void,
  create: (this: PhaserWithGridEngine) => void,
  update: (this: PhaserWithGridEngine) => void,
  parentRef?: string
): Phaser.Types.Core.GameConfig => {
  return {
    title: 'GridEngineExample',
    render: {
      antialias: false,
    },
    type: Phaser.AUTO,
    plugins: {
      scene: [
        {
          key: 'gridEngine',
          plugin: GridEngine,
          mapping: 'gridEngine',
        },
      ],
    },
    scale: {
      width: '100%',
      height: '100%',
    },
    scene: {
      preload,
      create,
      update,
    },
    parent: parentRef,
    backgroundColor: '#fff',

    input: {
      mouse: {
        preventDefaultWheel: false,
      },
      touch: {
        capture: false,
      },
    },
  };
};
