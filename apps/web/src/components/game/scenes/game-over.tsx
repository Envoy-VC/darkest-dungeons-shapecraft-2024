import Phaser from 'phaser';

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene' });
  }

  create() {
    // Display "Game Over" text
    const gameOverText = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      'GAME OVER',
      {
        fontSize: '48px',
        color: '#ff0000',
      }
    );
    gameOverText.setOrigin(0.5);

    // Add restart button or interaction
    const restartText = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY + 100,
      'Press SPACE to Restart',
      {
        fontSize: '24px',
        color: '#ffffff',
      }
    );
    restartText.setOrigin(0.5);

    // Restart the game on key press
    this.input.keyboard?.on('keydown-SPACE', () => {
      this.scene.start('GameScene');
    });
  }
}
