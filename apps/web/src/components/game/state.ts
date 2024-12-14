import type { CoinType } from '~/lib/helpers/game';

import { makeAutoObservable } from 'mobx';

export class GameState {
  public level = 1;
  public score = 0;
  public playerHealth = 100;

  constructor() {
    makeAutoObservable(this);
  }

  public incrementLevel() {
    this.level++;
  }

  public getHealth() {
    return this.playerHealth;
  }

  decrementHealth(amount: number) {
    this.playerHealth = Math.max(this.playerHealth - amount, 0);
  }

  incrementHealth(amount: number) {
    this.playerHealth = Math.min(this.playerHealth + amount, 100);
  }

  public addCoin(type: CoinType) {
    this.score += type.points;
  }

  public incrementScore(points: number) {
    this.score += points;
  }
}

export const gameState = new GameState();
