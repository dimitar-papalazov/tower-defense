import Constants from "../constants/constants";
import SceneKeys from "../namespaces/sceneKeys";
import TowerDefenseScene from "./towerDefenseScene";
import '../game/typedefs/levelConfig.js'
import EnemiesEmitter from "../components/enemiesEmitter/enemiesEmitter.js";
import LevelHeadsUpDisplay from "../components/hud/levelHeadsUpDisplay.js";
import TowersEmitter from "../components/towersEmitter/towersEmitter.js";
import Notification from "../components/popup/notification.js";

export default class Level extends TowerDefenseScene {
    constructor() {
        super({ key: SceneKeys.Level });
    }

    /**
     * @param {object} data
     * @param {number} data.level
     */
    create(data) {
        const levelConfig = this.game.levels[data.level];

        this.addHud()
            .addGrass(levelConfig.path)
            .addPath(levelConfig.path)
            .addEnemyEmitter(levelConfig)
            .addTowersEmitter();

        this.hud.rowCounter.start();
    }

    addHud() {
        this.hud = new LevelHeadsUpDisplay(this);

        return this;
    }

    /** @param {LevelConfig} levelConfig */
    addEnemyEmitter(levelConfig) {
        this.enemies = new EnemiesEmitter(this, levelConfig.enemies, levelConfig.path);

        const rowCounter = this.hud.rowCounter;

        rowCounter.on(rowCounter.Events.END, this.enemies.start, this.enemies);

        this.enemies.on(EnemiesEmitter.Events.ROWS_FINISH, this.onRowsFinish, this);

        return this;
    }

    addTowersEmitter() {
        this.towers = new TowersEmitter(this, this.enemies, this.path);

        this.enemies.on(EnemiesEmitter.Events.ENEMY_MOVED, this.towers.onEnemyMoved, this.towers);

        return this;
    }

    addGrass() {
        /** @type {Phaser.GameObjects.Image[]} */
        this.grass = [];
        const halfTileSize = Constants.TILE_SIZE * 0.5;
        const maxX = Constants.WIDTH / Constants.TILE_SIZE;
        const maxY = Constants.HEIGHT / Constants.TILE_SIZE;

        for (let i = 0; i < maxX; i++) {
            for (let j = 0; j < maxY; j++) {
                const x = i * Constants.TILE_SIZE + halfTileSize;
                const y = j * Constants.TILE_SIZE + halfTileSize;

                this.grass.push(this.add.image(x, y, 'grass'));
            }
        }

        return this;
    }

    /** @param {Position[]} positions */
    addPath(positions) {
        this.path = [];

        for(const position of positions) {
            this.path.push(this.add.image(position.x, position.y, 'path'));
        }

        return this;
    }

    onRowsFinish() {
        this.popupManager.addNotification('Level Completed')
            .once(Notification.Events.HIDE_FINISH, () => this.game.switchToScene(SceneKeys.LevelSelect));
    }
}