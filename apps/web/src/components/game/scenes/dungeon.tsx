import * as Actions from '~/lib/game/actions';

import Phaser from 'phaser';

export class DungeonGameScene extends Phaser.Scene {
  public sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | null;

  constructor() {
    super('DungeonGameScene');
    this.sprite = null;
  }

  setSprite = (s: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) => {
    this.sprite = s;
  };

  preload() {
    Actions.preload(this);
  }

  create() {
    Actions.createMap(this, this.setSprite);
  }

  update() {
    if (this.sprite === null) return;
    Actions.initializeMovement(this, this.sprite);
  }
}
