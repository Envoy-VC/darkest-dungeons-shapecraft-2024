import { generateDungeon } from '~/lib/helpers/game';

import * as Actions from '~/lib/game/actions';

import type Dungeon from '@mikewesthad/dungeon';
import Phaser from 'phaser';

import { type Coin, type Enemy, Player } from '../entities';
import { gameState } from '../state';

export class DungeonGameScene extends Phaser.Scene {
  public dungeon!: Dungeon;
  public player!: Player;
  public coins: Coin[] = [];
  public enemies: Enemy[] = [];

  constructor() {
    super('DungeonGameScene');
  }

  init() {
    const level = gameState.level;
    this.dungeon = generateDungeon(level);
  }

  preload() {
    Actions.preload(this);
  }

  create() {
    Actions.createAnimations(this);
    const args = Actions.createMap(this);
    this.player = new Player(this, args.startX, args.startY);

    this.physics.add.collider(this.player.sprite, args.groundLayer);
    this.physics.add.collider(this.player.sprite, args.stuffLayer);

    const coins = Actions.placeCoins.call(this, args.map, args.stuffLayer);

    coins.forEach((coin) => {
      this.physics.add.overlap(this.player.sprite, coin.sprite, () => {
        coin.pickup();
      });
    });

    const enemies = Actions.placeEnemies.call(
      this,
      args.otherRooms,
      args.map,
      args.stuffLayer
    );
    this.enemies.push(...enemies);

    for (const enemy of this.enemies) {
      if (!enemy.sprite) continue;
      this.physics.add.collider(
        this.player.sprite,
        enemy.sprite,
        () => this.onPlayerEnemyCollision(this.player, enemy),
        undefined,
        this
      );
    }

    const camera = this.cameras.main;

    camera.setBounds(0, 0, args.mapWidth, args.mapHeight);
    camera.startFollow(this.player.sprite);
  }

  private onPlayerEnemyCollision(player: Player, enemy: Enemy) {
    // Enemy Attacks Player
    enemy.attack(player, this.time.now);
  }

  update() {
    this.player.update(this);
    this.enemies.forEach((enemy) => {
      enemy.update(this);
    });
  }
}
