import '../../game/typedefs/levelConfig.js';
import Enemy from '../../namespaces/enemy.js';

export default class EnemiesEmitter extends Phaser.Events.EventEmitter {
    static Events = {
        START: 'start',
        ROW_START: 'rowStart',
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

        this.on(EnemiesEmitter.Events.ROW_START, this.onRowStart, this)
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
        this.enemies = [];

        const { x, y } = this.path[0];

        for (let i = 0; i < row.creep; i++) {
            this.enemies.push(this.scene.add.sprite(x, y, `${Enemy.CREEP}Front`));
        }

        for (let i = 0; i < row.armoredCreep; i++) {
            this.enemies.push(this.scene.add.sprite(x, y, `${Enemy.ARMORED_CREEP}Front`));
        }

        for (let i = 0; i < row.absorberCreep; i++) {
            this.enemies.push(this.scene.add.sprite(x, y, `${Enemy.ABSORBER_CREEP}Front`));
        }

        this.emit(EnemiesEmitter.Events.START_MOVING);
    }


    onStartMoving() {
        for (let i = 0; i < this.enemies.length; i++) {
            const enemy = this.enemies[i];

            this.scene.time.delayedCall(1000 * i, () => this.emit(EnemiesEmitter.Events.ENEMY_MOVED, enemy, 1));
        }
    }

    /**
     * @param {Phaser.GameObjects.Sprite} enemy
     * @param {number} index
     */
    onEnemyMoved(enemy, index) {
        if (index === this.path.length) {
            return;
        }

        const { x, y } = this.path[index];

        // TODO: enemy class and move method

        this.scene.tweens.add({
            targets: enemy,
            x,
            y,
            ease: Phaser.Math.Easing.Linear,
            duration: 1000,
            onComplete: () => this.emit(EnemiesEmitter.Events.ENEMY_MOVED, enemy, index + 1)
        });
    }
}