import * as Actions from '~/lib/game/actions';

export class Player {
  public scene: Phaser.Scene;
  public sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene;
    const anims = scene.anims;
    anims.create({
      key: 'player-walk',
      frames: anims.generateFrameNumbers('characters', {
        start: 46,
        end: 49,
      }),
      frameRate: 8,
      repeat: -1,
    });
    anims.create({
      key: 'player-walk-back',
      frames: anims.generateFrameNumbers('characters', {
        start: 65,
        end: 68,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.sprite = scene.physics.add
      .sprite(x, y, 'characters', 0)
      .setSize(22, 33)
      .setOffset(23, 27);

    this.sprite.anims.play('player-walk-back');
    scene.input.keyboard?.createCursorKeys();
  }

  freeze() {
    this.sprite.body.moves = false;
  }

  update() {
    Actions.initializeMovement(this.scene, this.sprite);
  }

  destroy() {
    this.sprite.destroy();
  }
}
