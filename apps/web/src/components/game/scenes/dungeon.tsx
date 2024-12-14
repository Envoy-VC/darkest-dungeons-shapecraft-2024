import { generateDungeon } from '~/lib/helpers/game';

import * as Actions from '~/lib/game/actions';

import type Dungeon from '@mikewesthad/dungeon';
import Phaser from 'phaser';

import { type Coin, Player } from '../entities';
import { gameState } from '../state';

export class DungeonGameScene extends Phaser.Scene {
  public dungeon!: Dungeon;
  public player!: Player;
  public coins: Coin[] = [];

  constructor() {
    super('DungeonGameScene');
  }

  init() {
    const level = gameState.level;
    console.log('level', level);
    this.dungeon = generateDungeon(level);
  }

  preload() {
    Actions.preload(this);
  }

  create() {
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

    const camera = this.cameras.main;

    camera.setBounds(0, 0, args.mapWidth, args.mapHeight);
    camera.startFollow(this.player.sprite);
  }

  update() {
    this.player.update();
  }
}
