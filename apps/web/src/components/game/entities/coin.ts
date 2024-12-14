import type { CoinType } from '~/lib/helpers/game';

import type { Room } from '@mikewesthad/dungeon';

import { gameState } from '../state';

export class Coin {
  public scene: Phaser.Scene;
  public sprite: Phaser.GameObjects.Sprite;
  public type: CoinType;
  public room: Room;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    type: CoinType,
    room: Room
  ) {
    this.type = type;
    this.scene = scene;
    this.room = room;

    this.sprite = scene.physics.add.staticSprite(x, y, type.key);
    this.sprite.setScale(2);
    this.sprite.play(`coin-${type.key}`);
  }

  pickup() {
    this.sprite.destroy();
    gameState.addCoin(this.type);
    gameState.incrementHealth(this.type.healthRegeneration);
  }

  update(activeRoom: Room) {
    if (activeRoom === this.room) {
      this.sprite.setVisible(true);
    } else {
      this.sprite.setVisible(false);
    }
  }
}
