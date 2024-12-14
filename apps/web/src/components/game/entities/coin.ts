import type { coins } from '~/lib/helpers/game';

import { gameState } from '../state';

export class Coin {
  public scene: Phaser.Scene;
  public sprite: Phaser.GameObjects.Sprite;
  public type: (typeof coins)[number]['key'];

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    type: (typeof coins)[number]['key']
  ) {
    this.type = type;
    this.scene = scene;

    const anims = scene.anims;

    scene.anims.create({
      key: `coin-${String(x)}-${String(y)}-${type}`,
      frames: anims.generateFrameNumbers(type, { start: 0, end: 3 }),
      frameRate: 4,
      repeat: -1,
    });

    this.sprite = scene.physics.add.staticSprite(x, y, type);

    this.sprite.setScale(2);

    this.sprite.play(`coin-${String(x)}-${String(y)}-${type}`);
  }

  pickup() {
    this.sprite.destroy();
    gameState.addCoin(this.type);
  }
}
