import Phaser from 'phaser';

import { type DungeonGameScene } from '../scenes';
import { gameState } from '../state';
import { type Enemy } from './enemy';

export class Player {
  public scene: Phaser.Scene;
  public sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  public attackCooldown: number;
  public lastAttackTime: number;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.attackCooldown = 2000; // Attack cooldown in milliseconds
    this.lastAttackTime = 0;

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

  public attack(enemies: Enemy[], currentTime: number): void {
    for (const enemy of enemies) {
      if (!enemy.sprite) continue;
      if (currentTime - this.lastAttackTime > this.attackCooldown) {
        const distance = Phaser.Math.Distance.Between(
          this.sprite.x,
          this.sprite.y,
          enemy.sprite.x,
          enemy.sprite.y
        );
        if (distance < 50) {
          enemy.onHitByPlayer();
          this.lastAttackTime = currentTime;
        }
      }
    }
  }

  update(scene: DungeonGameScene) {
    const keys = this.scene.input.keyboard?.createCursorKeys();
    const wasd = this.scene.input.keyboard?.addKeys({
      w: Phaser.Input.Keyboard.KeyCodes.W,
      s: Phaser.Input.Keyboard.KeyCodes.S,
      a: Phaser.Input.Keyboard.KeyCodes.A,
      d: Phaser.Input.Keyboard.KeyCodes.D,
    }) as {
      w: Phaser.Input.Keyboard.Key;
      s: Phaser.Input.Keyboard.Key;
      a: Phaser.Input.Keyboard.Key;
      d: Phaser.Input.Keyboard.Key;
    };
    const spaceKey = this.scene.input.keyboard?.addKeys({
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
    }) as {
      space: Phaser.Input.Keyboard.Key;
    };
    const speed = 300;

    if (!keys) return;
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- could be
    if (!this.sprite.body) return;

    if (spaceKey.space.isDown) {
      this.attack(scene.enemies, scene.time.now);
    }

    const prevVelocity = this.sprite.body.velocity.clone();

    this.sprite.body.setVelocity(0);

    // Horizontal movement
    if (keys.left.isDown || wasd.a.isDown) {
      this.sprite.body.setVelocityX(-speed);
      this.sprite.setFlipX(true);
    } else if (keys.right.isDown || wasd.d.isDown) {
      this.sprite.body.setVelocityX(speed);
      this.sprite.setFlipX(false);
    }

    // Vertical movement
    if (keys.up.isDown || wasd.w.isDown) {
      this.sprite.body.setVelocityY(-speed);
    } else if (keys.down.isDown || wasd.s.isDown) {
      this.sprite.body.setVelocityY(speed);
    }

    // Normalize and scale the velocity so that sprite can't move faster along a diagonal
    this.sprite.body.velocity.normalize().scale(speed);

    // Update the animation last and give left/right animations precedence over up/down animations
    if (
      keys.left.isDown ||
      keys.right.isDown ||
      keys.down.isDown ||
      wasd.a.isDown ||
      wasd.d.isDown ||
      wasd.s.isDown
    ) {
      this.sprite.anims.play('player-walk', true);
    } else if (keys.up.isDown || wasd.w.isDown) {
      this.sprite.anims.play('player-walk-back', true);
    } else {
      this.sprite.anims.stop();

      // If we were moving, pick and idle frame to use
      if (prevVelocity.y < 0) this.sprite.setTexture('characters', 65);
      else this.sprite.setTexture('characters', 46);
    }
  }

  onHitByEnemy(dps: number) {
    gameState.decrementHealth(dps);
  }

  destroy() {
    this.sprite.destroy();
  }
}
