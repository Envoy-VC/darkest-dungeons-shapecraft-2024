import Phaser from 'phaser';

import { DungeonGameScene } from './scenes';

const config: Phaser.Types.Core.GameConfig = {
  width: 800,
  height: 600,
  type: Phaser.AUTO,
  scene: [DungeonGameScene],
  scale: {
    width: '100%',
    height: '100%',
  },
  parent: 'game-container',
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0, x: 1 },
    },
  },
};

export const phaserGame = new Phaser.Game(config);
