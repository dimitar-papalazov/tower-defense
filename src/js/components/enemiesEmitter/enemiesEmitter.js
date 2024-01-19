import Constants from '../../constants/constants.js';
import '../../game/typedefs/levelConfig.js';
import AbsorberCreepEnemy from '../sprites/enemies/absorberCreepEnemy.js';
import AbstractEnemy from '../sprites/enemies/abstractEnemy.js';
import ArmoredCreepEnemy from '../sprites/enemies/armoredCreepEnemy.js';
import CreepEnemy from '../sprites/enemies/creepEnemy.js';

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

        for (const enemy of this.enemies) {
            enemy.once(Phaser.GameObjects.Events.DESTROY, this.onEnemyKilled, this);
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
        for (let i = 0; i < this.enemies.length; i++) {
            const enemy = this.enemies[i];

            this.scene.time.delayedCall(Constants.ENEMY_MOVE_DURATION * i, () => this.emit(EnemiesEmitter.Events.ENEMY_MOVED, enemy, 0));
        }
    }

    /**
     * @param {AbstractEnemy} enemy
     * @param {number} index
     */
    onEnemyMoved(enemy, index) {
        if (index === this.path.length) {
            const { x, y } = this.getEndpointPosition(false);

            enemy.move(x, y)
                .once(AbstractEnemy.Events.ENEMY_MOVED, () => enemy.destroy());
        } else {
            const { x, y } = this.path[index];
    
            enemy.move(x, y)
                .once(AbstractEnemy.Events.ENEMY_MOVED, () => this.emit(EnemiesEmitter.Events.ENEMY_MOVED, enemy, index + 1));
        }
    }

    onEnemyKilled() {
        this.destroyedEnemies++;

        if (this.enemies.length === this.destroyedEnemies) {
            this.emit(EnemiesEmitter.Events.ROW_FINISH);
        }
    }

    onRowFinish() {
        const row = this.rows.shift();

        if (row === undefined) {
            this.emit(EnemiesEmitter.Events.ROWS_FINISH);
        } else {
            this.scene.time.delayedCall(Constants.ROW_PAUSE_PERIOD, () => this.emit(EnemiesEmitter.Events.ROW_START, row));
        }
    }
}