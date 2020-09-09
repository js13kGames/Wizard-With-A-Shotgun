'use strict';

import { game } from '../Game';
import { R360, TILE_SIZE } from '../Constants';
import { xy2qr, vectorBetween, vectorAdd, angle2vector, rgba } from '../Util';
import { Player } from '../Player';
import { HealthChunkAnimation } from '../HealthChunkAnimation';
import { ScreenShake } from '../ScreenShake';
import { Stabguts } from '../Stabguts';
import { Spindoctor } from '../Spindoctor';
import { SpawnAnimation } from '../SpawnAnimation';
import { Audio } from '../Audio';
import { Viewport } from '../Viewport';

/**
 * Victory
 */
export const Victory = {
    apply() {
        if (game.player.pages >= 404 && !game.victory) {
            game.victory = true;
            Victory.frame = 0;

            let room = game.maze.rooms[2];
            game.player.pos = {
                x: (room.q + 0.5) * TILE_SIZE,
                y: (room.r + 0.5) * TILE_SIZE
            };
            game.brawl = false;
            for (let entity of game.entities) {
                if (entity.enemy) entity.state = DEAD;
            }
        } else if (game.victory) {
            Victory.frame++;
            game.player.pages = 404;

            if (Victory.frame === 10) {
                game.entities.push(new SpawnAnimation(game.player.pos));
                game.screenshakes.push(new ScreenShake(20, 20, 90));
            }

            if (Victory.frame % 30 === 0) {
                let pos = vectorAdd(game.player.pos, angle2vector(Math.random() * R360, 48));
                let enemyType = [Stabguts, Stabguts, Spindoctor][Math.random() * 3 | 0];
                let enemy = new enemyType(pos);
                game.entities.push(enemy);
                game.entities.push(new SpawnAnimation(pos));
            }
        }
    }
};