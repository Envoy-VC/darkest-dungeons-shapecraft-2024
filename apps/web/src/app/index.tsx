import { useEffect } from 'react';

import { createFileRoute } from '@tanstack/react-router';
import { Direction } from 'grid-engine';
import Phaser from 'phaser';

import { type PhaserWithGridEngine, config } from '../lib/game-config';

export const HomeComponent = () => {
  useEffect(() => {
    const game = new Phaser.Game(
      config(preload, create, update, '#game-container')
    );

    function preload(this: Phaser.Scene) {
      this.load.image('tileset', '../../public/assets/tileset.png');
      this.load.tilemapTiledJSON('tilemap', '../../public/assets/tilemap.json');
      this.load.spritesheet('player', '../../public/assets/character.png', {
        frameWidth: 52,
        frameHeight: 72,
      });
    }

    function create(this: PhaserWithGridEngine) {
      const map = this.make.tilemap({ key: 'tilemap' });
      map.addTilesetImage('tileset', 'tileset');

      map.layers.forEach((layer, i) => {
        const createdLayer = map.createLayer(i, 'tileset', 0, 0);
        if (createdLayer) {
          createdLayer.scale = 5;
        }
      });

      const playerSprite = this.add.sprite(0, 0, 'player');
      playerSprite.scale = 2;
      const container = this.add.container(0, 0, [playerSprite]);
      this.cameras.main.startFollow(container);

      const gridEngineConfig = {
        characters: [
          {
            id: 'me',
            sprite: playerSprite,
            container,
            walkingAnimationMapping: 6,
            walkingAnimationEnabled: true,
            startPosition: { x: 8, y: 8 },
          },
        ],
      };

      this.gridEngine?.create(map, gridEngineConfig);
    }

    function update(this: PhaserWithGridEngine) {
      const cursors = this.input.keyboard?.createCursorKeys();

      if (cursors) {
        if (cursors.left.isDown) {
          this.gridEngine?.move('me', Direction.LEFT);
        } else if (cursors.right.isDown) {
          this.gridEngine?.move('me', Direction.RIGHT);
        } else if (cursors.up.isDown) {
          this.gridEngine?.move('me', Direction.UP);
        } else if (cursors.down.isDown) {
          this.gridEngine?.move('me', Direction.DOWN);
        } else {
          this.gridEngine?.clearEnqueuedMovements('me');
        }
      }
    }

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div id='game-container' className='h-screen w-full' />;
};

export const Route = createFileRoute('/')({
  component: HomeComponent,
});
