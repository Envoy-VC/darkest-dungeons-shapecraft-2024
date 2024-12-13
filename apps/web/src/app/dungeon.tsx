/* eslint-disable @eslint-community/eslint-comments/disable-enable-pair -- safe */

/* eslint-disable @typescript-eslint/no-non-null-assertion -- safe */
import { useEffect } from 'react';

import { config } from '~/lib/dungeon-config';

import Dungeon, { type Room } from '@mikewesthad/dungeon';
import { createFileRoute } from '@tanstack/react-router';
import Phaser from 'phaser';

import { TILES } from '../components/dungeon/tile-mappings';
import { type PhaserWithGridEngine } from '../lib/game-config';

export const HomeComponent = () => {
  useEffect(() => {
    const game = new Phaser.Game(
      config(preload, create, update, 'dungeon-container')
    );

    let sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

    function preload(this: Phaser.Scene) {
      this.load.image('tiles', '../../public/dungeon/dungeon-tileset.png');
      this.load.spritesheet(
        'characters',
        '../../public/dungeon/character.png',
        {
          frameWidth: 64,
          frameHeight: 64,
          margin: 1,
          spacing: 2,
        }
      );
    }

    function create(this: PhaserWithGridEngine) {
      const dungeon = new Dungeon({
        width: 50,
        height: 50,
        doorPadding: 2,
        rooms: {
          width: { min: 7, max: 15, onlyOdd: true },
          height: { min: 7, max: 15, onlyOdd: true },
        },
      });

      dungeon.drawToConsole({});

      this.add.image(0, 0, 'tiles');

      const map = this.make.tilemap({
        tileWidth: 48,
        tileHeight: 48,
        width: dungeon.width,
        height: dungeon.height,
      });
      const tileset = map.addTilesetImage('tileset', 'tiles', 48, 48, 1, 2); // 1px margin, 2px spacing
      if (!tileset) return;
      const groundLayer = map
        .createBlankLayer('Ground', tileset)
        ?.fill(TILES.BLANK);

      const stuffLayer = map.createBlankLayer('Stuff', tileset);
      // const shadowLayer = map
      //   .createBlankLayer('Shadow', tileset)
      //   ?.fill(TILES.BLANK);

      if (!groundLayer) return;
      if (!stuffLayer) return;

      dungeon.rooms.forEach((room) => {
        const { x, y, width, height, left, right, top, bottom } = room;
        // Fill the floor with mostly clean tiles
        groundLayer.weightedRandomize(
          TILES.FLOOR,
          x + 1,
          y + 1,
          width - 2,
          height - 2
        );
        // Place the room corners tiles
        groundLayer.putTileAt(TILES.WALL.TOP_LEFT, left, top);
        groundLayer.putTileAt(TILES.WALL.TOP_RIGHT, right, top);
        groundLayer.putTileAt(TILES.WALL.BOTTOM_RIGHT, right, bottom);
        groundLayer.putTileAt(TILES.WALL.BOTTOM_LEFT, left, bottom);
        // Fill the walls with mostly clean tiles
        groundLayer.weightedRandomize(
          TILES.WALL.TOP,
          left + 1,
          top,
          width - 2,
          1
        );
        groundLayer.weightedRandomize(
          TILES.WALL.BOTTOM,
          left + 1,
          bottom,
          width - 2,
          1
        );
        groundLayer.weightedRandomize(
          TILES.WALL.LEFT,
          left,
          top + 1,
          1,
          height - 2
        );
        groundLayer.weightedRandomize(
          TILES.WALL.RIGHT,
          right,
          top + 1,
          1,
          height - 2
        );
        // Dungeons have rooms that are connected with doors. Each door has an x & y relative to the
        // room's location. Each direction has a different door to tile mapping.
        const doors = room.getDoorLocations(); // → Returns an array of {x, y} objects
        // eslint-disable-next-line @typescript-eslint/prefer-for-of -- temp
        for (let i = 0; i < doors.length; i++) {
          if (doors[i]!.y === 0) {
            groundLayer.putTilesAt(
              TILES.DOOR.TOP,
              x + doors[i]!.x - 1,
              y + doors[i]!.y
            );
          } else if (doors[i]!.y === room.height - 1) {
            groundLayer.putTilesAt(
              TILES.DOOR.BOTTOM,
              x + doors[i]!.x - 1,
              y + doors[i]!.y
            );
          } else if (doors[i]!.x === 0) {
            groundLayer.putTilesAt(
              TILES.DOOR.LEFT,
              x + doors[i]!.x,
              y + doors[i]!.y - 1
            );
          } else if (doors[i]!.x === room.width - 1) {
            groundLayer.putTilesAt(
              TILES.DOOR.RIGHT,
              x + doors[i]!.x,
              y + doors[i]!.y - 1
            );
          }
        }
      });

      // Separate out the rooms into:
      //  - The starting room (index = 0)
      //  - A random room to be designated as the end room (with stairs and nothing else)
      //  - An array of 90% of the remaining rooms, for placing random stuff (leaving 10% empty)
      const rooms = dungeon.rooms.slice();
      const startRoom = rooms.shift();
      const endRoom = Phaser.Utils.Array.RemoveRandomElement(rooms) as Room;
      const otherRooms = Phaser.Utils.Array.Shuffle(rooms).slice(
        0,
        rooms.length * 0.9
      );

      // Place the stairs
      stuffLayer.putTileAt(TILES.STAIRS, endRoom.centerX, endRoom.centerY);

      // Place stuff in the 90% "otherRooms"
      otherRooms.forEach((room) => {
        const rand = Math.random();
        if (rand <= 0.25) {
          // 25% chance of chest
          stuffLayer.putTileAt(TILES.CHEST, room.centerX, room.centerY);
        } else if (rand <= 0.5) {
          // 50% chance of a pot anywhere in the room... except don't block a door!
          const x = Phaser.Math.Between(room.left + 2, room.right - 2);
          const y = Phaser.Math.Between(room.top + 2, room.bottom - 2);
          stuffLayer.weightedRandomize(TILES.POT, x, y, 1, 1);
        } else {
          // 25% of either 2 or 4 towers, depending on the room size
          // eslint-disable-next-line no-lonely-if -- safe
          if (room.height >= 9) {
            stuffLayer.putTilesAt(
              TILES.TOWER,
              room.centerX - 1,
              room.centerY + 1
            );
            stuffLayer.putTilesAt(
              TILES.TOWER,
              room.centerX + 1,
              room.centerY + 1
            );
            stuffLayer.putTilesAt(
              TILES.TOWER,
              room.centerX - 1,
              room.centerY - 2
            );
            stuffLayer.putTilesAt(
              TILES.TOWER,
              room.centerX + 1,
              room.centerY - 2
            );
          } else {
            stuffLayer.putTilesAt(
              TILES.TOWER,
              room.centerX - 1,
              room.centerY - 1
            );
            stuffLayer.putTilesAt(
              TILES.TOWER,
              room.centerX + 1,
              room.centerY - 1
            );
          }
        }
      });

      // // Not exactly correct for the tileset since there are more possible floor tiles, but this will
      // // do for the example.
      groundLayer.setCollisionByExclusion([-1, 6, 7, 8, 26]);
      stuffLayer.setCollisionByExclusion([-1, 6, 7, 8, 26]);

      stuffLayer.setTileIndexCallback(
        TILES.STAIRS,
        () => {
          stuffLayer.setTileIndexCallback(
            TILES.STAIRS,
            () => {
              return true;
            },
            {}
          );
          // this.hasPlayerReachedStairs = true;
          // this.player.freeze();
          const cam = this.cameras.main;
          cam.fade(250, 0, 0, 0);
          cam.once('camerafadeoutcomplete', () => {
            // this.player.destroy();
            this.scene.restart();
          });
        },
        {}
      );

      if (!startRoom) return;

      const playerRoom = startRoom;
      const x = map.tileToWorldX(playerRoom.centerX)!;
      const y = map.tileToWorldY(playerRoom.centerY)!;

      const anims = this.anims;

      this.anims.create({
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

      sprite = this.physics.add
        .sprite(x, y, 'characters', 0)
        .setSize(22, 33)
        .setOffset(23, 27);

      sprite.anims.play('player-walk-back');

      // Watch the player and tilemap layers for collisions, for the duration of the scene:
      this.physics.add.collider(sprite, groundLayer);
      this.physics.add.collider(sprite, stuffLayer);

      // Phaser supports multiple cameras, but you can access the default camera like this:
      const camera = this.cameras.main;

      // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
      camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
      camera.startFollow(sprite);

      console.log(sprite);
    }

    function update(this: PhaserWithGridEngine) {
      const keys = this.input.keyboard?.createCursorKeys();
      const speed = 300;

      if (!keys) return;

      const prevVelocity = sprite.body.velocity.clone();

      sprite.body.setVelocity(0);

      // Horizontal movement
      if (keys.left.isDown) {
        sprite.body.setVelocityX(-speed);
        sprite.setFlipX(true);
      } else if (keys.right.isDown) {
        sprite.body.setVelocityX(speed);
        sprite.setFlipX(false);
      }

      // Vertical movement
      if (keys.up.isDown) {
        sprite.body.setVelocityY(-speed);
      } else if (keys.down.isDown) {
        sprite.body.setVelocityY(speed);
      }

      // Normalize and scale the velocity so that sprite can't move faster along a diagonal
      sprite.body.velocity.normalize().scale(speed);

      // Update the animation last and give left/right animations precedence over up/down animations
      if (keys.left.isDown || keys.right.isDown || keys.down.isDown) {
        sprite.anims.play('player-walk', true);
      } else if (keys.up.isDown) {
        sprite.anims.play('player-walk-back', true);
      } else {
        sprite.anims.stop();

        // If we were moving, pick and idle frame to use
        if (prevVelocity.y < 0) sprite.setTexture('characters', 65);
        else sprite.setTexture('characters', 46);
      }
    }

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div id='dungeon-container' />;
};

export const Route = createFileRoute('/dungeon')({
  component: HomeComponent,
});
