import type { EnemyType } from '~/lib/helpers/game';

import Phaser from 'phaser';

import type { DungeonGameScene } from '../scenes';
import { gameState } from '../state';
import { HealthBar } from './healthbar';
import type { Player } from './player';

export class Enemy {
  public sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;
  public health: number;
  public lastAttackTime: number;
  private healthBar: HealthBar;
  public enemyType: EnemyType;

  constructor(scene: DungeonGameScene, x: number, y: number, type: EnemyType) {
    this.health = type.maxHealth;
    this.lastAttackTime = 0;
    this.enemyType = type;

    this.sprite = scene.physics.add.sprite(x, y, this.enemyType.key, 0);
    this.sprite.setScale(3);

    this.healthBar = new HealthBar(scene, this.sprite, 100);
    this.healthBar.updateHealthBar();
  }

  freeze() {
    if (!this.sprite) return;
    this.sprite.body.moves = false;
  }

  public moveTowardPlayer(scene: DungeonGameScene): void {
    if (!this.sprite) return;

    const distance = Phaser.Math.Distance.Between(
      scene.player.sprite.x,
      scene.player.sprite.y,
      this.sprite.x,
      this.sprite.y
    );

    if (
      distance < this.enemyType.maxDistance &&
      distance > this.enemyType.minDistance
    ) {
      scene.physics.moveToObject(
        this.sprite,
        scene.player.sprite,
        this.enemyType.movementSpeed
      );
    } else {
      this.sprite.setVelocity(0, 0);
    }
  }

  public attack(player: Player, currentTime: number): void {
    if (!this.sprite) return;
    if (currentTime - this.lastAttackTime > this.enemyType.attackCooldown) {
      const distance = Phaser.Math.Distance.Between(
        this.sprite.x,
        this.sprite.y,
        player.sprite.x,
        player.sprite.y
      );
      if (distance < this.enemyType.minDistance) {
        player.onHitByEnemy(this.enemyType.dps);
        this.lastAttackTime = currentTime;
      }
    }
  }

  // Method to handle when the enemy is attacked by the player
  public onHitByPlayer(): void {
    this.health -= 30; // Reduce enemy health
    if (this.health <= 0) {
      this.destroy();
    }
    this.healthBar.takeDamage(30);
  }

  update(scene: DungeonGameScene) {
    if (!this.sprite) return;
    this.moveTowardPlayer(scene);
    this.attack(scene.player, scene.time.now);
    this.healthBar.updateHealthBarPosition();

    const velocityX = this.sprite.body.velocity.x;
    const velocityY = this.sprite.body.velocity.y;

    if (velocityX < 0) {
      // Moving left
      this.sprite.anims.play(`move-left-${this.enemyType.key}`, true);
    } else if (velocityX > 0) {
      // Moving right
      this.sprite.anims.play(`move-right-${this.enemyType.key}`, true);
    } else if (velocityY < 0) {
      // Moving up
      this.sprite.anims.play(`move-up-${this.enemyType.key}`, true);
    } else if (velocityY > 0) {
      // Moving down
      this.sprite.anims.play(`move-down-${this.enemyType.key}`, true);
    } else {
      // If not moving, stop the animation
      this.sprite.anims.stop();
    }
  }

  destroy() {
    this.sprite?.destroy();
    gameState.incrementScore(this.enemyType.pointsOnKill);
    this.sprite = undefined;
    this.healthBar.destroy();
  }
}
