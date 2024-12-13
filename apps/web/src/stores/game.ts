import { create } from 'zustand';

interface GameState {
  sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | null;
}

interface GameActions {
  setSprite: (
    sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
  ) => void;
}

export const useGameStore = create<GameState & GameActions>((set) => ({
  sprite: null,
  setSprite: (sprite) => set({ sprite }),
}));
