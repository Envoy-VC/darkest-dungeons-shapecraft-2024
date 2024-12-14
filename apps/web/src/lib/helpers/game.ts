import Dungeon from '@mikewesthad/dungeon';

const mapWidth = (level: number) => 50 + level ** 2 + 10 * level; // 50 61 74 89 106 125
const mapHeight = (level: number) => 50 + level ** 2 + 10 * level; // 50 61 74 89 106 125
const doorPadding = 4;
const roomConfig = () => {
  return {
    width: { min: 7, max: 15, onlyOdd: true },
    height: { min: 7, max: 15, onlyOdd: true },
  };
};

export const generateDungeon = (level: number): Dungeon => {
  return new Dungeon({
    width: mapWidth(level),
    height: mapHeight(level),
    doorPadding,
    rooms: roomConfig(),
  });
};

export const coins = [
  {
    key: 'diamond',
    weight: 2,
    points: 100,
  },
  {
    key: 'emerald',
    weight: 4,
    points: 50,
  },
  {
    key: 'ruby',
    weight: 4,
    points: 50,
  },
  {
    key: 'gold',
    weight: 10,
    points: 10,
  },
  {
    key: 'silver',
    weight: 20,
    points: 5,
  },
] as const;

export const pickRandomCoin = () => {
  // Pick random coin based on weight, more weight = more likely to be picked
  const totalWeight = coins.reduce((acc, coin) => acc + coin.weight, 0);
  const rand = Math.random() * totalWeight;
  let runningWeight = 0;
  for (const coin of coins) {
    runningWeight += coin.weight;
    if (rand < runningWeight) {
      return coin;
    }
  }
};
