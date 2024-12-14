import { makeAutoObservable } from 'mobx';

import { coins } from '../../lib/helpers/game';

export class GameState {
  public level = 1;
  public score = 0;

  constructor() {
    makeAutoObservable(this);
  }

  public incrementLevel() {
    this.level++;
  }

  public addCoin(type: (typeof coins)[number]['key']) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- safe
    const coin = coins.find((c) => c.key === type)!;
    this.score += coin.points;
  }

  public incrementScore(points: number) {
    this.score += points;
  }
}

export const gameState = new GameState();
