import type { CoinType } from '~/lib/helpers/game';

import { gameState } from '../state';

export class Coin {
  public scene: Phaser.Scene;
  public sprite: Phaser.GameObjects.Sprite;
  public type: CoinType;

  constructor(scene: Phaser.Scene, x: number, y: number, type: CoinType) {
    this.type = type;
    this.scene = scene;

    this.sprite = scene.physics.add.staticSprite(x, y, type.key);

    this.sprite.setScale(2);

    this.sprite.play(`coin-${type.key}`);
  }

  pickup() {
    this.sprite.destroy();
    gameState.addCoin(this.type);
    gameState.incrementHealth(this.type.healthRegeneration);
  }
}
