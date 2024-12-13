import { createMap } from '~/lib/game/actions';

import { useGameStore } from '~/stores';

export const useGameActions = () => {
  const { setSprite } = useGameStore();

  function create(this: Phaser.Scene) {
    // createMap(this, setSprite);
  }

  return { create };
};
