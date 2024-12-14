import Phaser from 'phaser';

import { gameState } from '../state';

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene' });
  }

  preload() {
    this.load.image('background', '/background.png');
    this.load.image('logo', '/logo.png');
    this.load.image('storeButton', '/store-button.png');
    this.load.image('restartButton', '/restart-button.png');
    this.load.image('gameOverText', '/game-over-text.png');
    this.load.image('quitButton', '/quit-button.png');
  }

  create() {
    const { width, height } = this.scale;
    this.add.image(width / 2, height / 2, 'background').setScale(1);

    this.add
      .image(width / 2, height / 4, 'gameOverText')
      .setScale(1)
      .setDepth(1);

    const storeButton = this.add
      .image(width / 2, height / 2, 'storeButton')
      .setInteractive()
      .setScale(1)
      .setDepth(1);
    const restartButton = this.add
      .image(width / 2, height / 2 + 100, 'restartButton')
      .setInteractive()
      .setScale(1)
      .setDepth(1);

    const quitButton = this.add
      .image(width / 2, height / 2 + 200, 'quitButton')
      .setInteractive()
      .setScale(1)
      .setDepth(1);

    restartButton.on('pointerdown', () => {
      gameState.reset();
      this.scene.start('HomeScene');
    });

    storeButton.on('pointerdown', async () => {
      // TODO: Alchemy Interaction
      storeButton.setTint(0x808080);
      console.log('Storing...');
      await new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });
      console.log('Stored!');
      storeButton.clearTint();
    });

    quitButton.on('pointerdown', () => {
      gameState.reset();
      window.location.href = '/';
    });
  }
}
