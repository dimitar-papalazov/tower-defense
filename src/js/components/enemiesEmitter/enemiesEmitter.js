import Constants from '../../constants/constants.js';
import '../../game/typedefs/levelConfig.js';
import AbsorberCreepEnemy from '../entities/enemies/absorberCreepEnemy.js';
import AbstractEnemy from '../entities/enemies/abstractEnemy.js';
import ArmoredCreepEnemy from '../entities/enemies/armoredCreepEnemy.js';
import CreepEnemy from '../entities/enemies/creepEnemy.js';

export default class EnemiesEmitter extends Phaser.Events.EventEmitter {
    static Events = {
        START: 'start',
        ROW_START: 'rowStart',
        ROW_FINISH: 'rowFinish',
        ROWS_FINISH: 'rowsFinish',
        START_MOVING: 'startMoving',
        ENEMY_MOVED: 'enemyMoved',
    }

    /**
     * @param {import('../../scenes/level.js').default} scene
     * @param {EnemyRow[]} enemiesInfo
     * @param {Position[]} path
    */
    constructor(scene, enemiesInfo, path) {
        super();

        this.scene = scene;
        this.enemiesInfo = enemiesInfo;
        this.rows = [...this.enemiesInfo];
        this.path = path;
        this.destroyedEnemies = 0;

        this.on(EnemiesEmitter.Events.ROW_START, this.onRowStart, this)
            .on(EnemiesEmitter.Events.ROW_FINISH, this.onRowFinish, this)
            .on(EnemiesEmitter.Events.START_MOVING, this.onStartMoving, this)
            .on(EnemiesEmitter.Events.ENEMY_MOVED, this.onEnemyMoved, this);

        this.scene.events.on(Phaser.Scenes.Events.DESTROY, this.destroy, this);
    }

    start() {
        this.emit(EnemiesEmitter.Events.START);

        const row = this.rows.shift();

        this.emit(EnemiesEmitter.Events.ROW_START, row);
    }

    /** @param {EnemyRow} row */
    onRowStart(row) {
        this.destroyedEnemies = 0;
        /** @type {AbstractEnemy[]} */
        this.enemies = [];

        let { x, y } = this.getEndpointPosition();

        for (let i = 0; i < row.creep; i++) {
            this.enemies.push(new CreepEnemy(this.scene, x, y));
        }

        for (let i = 0; i < row.armoredCreep; i++) {
            this.enemies.push(new ArmoredCreepEnemy(this.scene, x, y));
        }

        for (let i = 0; i < row.absorberCreep; i++) {
            this.enemies.push(new AbsorberCreepEnemy(this.scene, x, y));
        }

        Phaser.Utils.Array.Shuffle(this.enemies);

        for (const enemy of this.enemies) {
            enemy.once(Phaser.GameObjects.Events.DESTROY, this.onEnemyDestroyed, this)
                .once(AbstractEnemy.Events.KILLED, this.onEnemyKilled, this)
                .once(AbstractEnemy.Events.FINISH, this.onEnemyFinish, this);
        }

        this.emit(EnemiesEmitter.Events.START_MOVING);
    }

    getEndpointPosition(first = true) {
        const index = first ? 0 : this.path.length - 1;

        let { x, y } = this.path[index];

        const tileSize = Constants.TILE_SIZE;
        const halfTileSize = tileSize * 0.5;
        const gameWidth = Constants.WIDTH;
        const gameHeight = Constants.HEIGHT;

        if (x === halfTileSize) {
            x -= tileSize
        } else if (x === gameWidth - halfTileSize) {
            x += tileSize;
        } else if (y === halfTileSize) {
            y -= tileSize
        } else if (y === gameHeight - halfTileSize) {
            y += tileSize;
        }

        return { x, y };
    }

    onStartMoving() {
        this.scene.sound.playMarch();

        /** @type {Phaser.Time.TimerEvent[]} */
        this.delayedCalls = [];

        for (let i = 0; i < this.enemies.length; i++) {
            const enemy = this.enemies[i];
            const delay = Constants.ENEMY_MOVE_DURATION * i;
            const callback = () => this.emit(EnemiesEmitter.Events.ENEMY_MOVED, enemy, 0);
            const delayedCall = this.scene.time.delayedCall(delay, callback);

            this.delayedCalls.push(delayedCall);
        }
    }

    /**
     * @param {AbstractEnemy} enemy
     * @param {number} index
     */
    onEnemyMoved(enemy, index) {
        this.currentMoveIndex = index;

        if (index === this.path.length) {
            const { x, y } = this.getEndpointPosition(false);

            enemy.move(x, y)
                .once(AbstractEnemy.Events.ENEMY_MOVED, () => enemy.finishPath());
        } else {
            const { x, y } = this.path[index];

            enemy.move(x, y)
                .once(AbstractEnemy.Events.ENEMY_MOVED, () => this.emit(EnemiesEmitter.Events.ENEMY_MOVED, enemy, index + 1));
        }
    }

    onEnemyDestroyed() {
        this.destroyedEnemies++;

        if (this.enemies.length === this.destroyedEnemies) {
            this.emit(EnemiesEmitter.Events.ROW_FINISH);
        }
    }

    onEnemyKilled() {
        this.scene.sound.playEnemyKilled();
        this.scene.hud.coinResource.increaseValue(Constants.KILLED_ENEMY_REWARD);
    }

    onEnemyFinish() {
        this.scene.hud.heartResource.decrementValue();
    }

    onRowFinish() {
        this.scene.sound.stopMarch();

        const row = this.rows.shift();

        if (row === undefined) {
            this.emit(EnemiesEmitter.Events.ROWS_FINISH);
        } else {
            this.scene.time.delayedCall(Constants.ROW_PAUSE_PERIOD, () => this.emit(EnemiesEmitter.Events.ROW_START, row));
        }
    }

    freeze() {
        if (!this.enemies) {
            return
        }

        this.delayedCalls.forEach(delayedCall => {
            if (!delayedCall.hasDispatched) {
                delayedCall.paused = true;
            }
        })

        this.frozen = true;

        this.enemies.forEach(enemy => enemy.freeze());
    }

    unfreeze() {
        if (!this.enemies) {
            return
        }

        this.delayedCalls.forEach(delayedCall => {
            if (!delayedCall.hasDispatched) {
                delayedCall.paused = false;
            }
        })

        this.frozen = false;

        this.enemies.forEach(enemy => enemy.unfreeze());
    }

    startFire() {
        if (!this.enemies) {
            return
        }

        this.enemies.forEach(enemy => enemy.fireDamage());
    }

    stopFire() {
        if (!this.enemies) {
            return
        }

        this.enemies.forEach(enemy => enemy.removeFireEffect());
    }
}