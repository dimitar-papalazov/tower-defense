import Constants from "../constants/constants";
import SceneKeys from "../namespaces/sceneKeys";
import TowerDefenseScene from "./towerDefenseScene";
import '../game/typedefs/levelConfig.js'
import EnemiesEmitter from "../components/enemiesEmitter/enemiesEmitter.js";
import LevelHeadsUpDisplay from "../components/hud/levelHeadsUpDisplay.js";
import TowersEmitter from "../components/towersEmitter/towersEmitter.js";
import Notification from "../components/popup/notification.js";
import SpecialsEmitter from "../components/specialsEmitter/specialsEmitter.js";
import PathWalkthrough from "../components/pathWalkthrough/pathWalkthrough.js";

export default class Level extends TowerDefenseScene {
    constructor() {
        super({ key: SceneKeys.Level });
    }

    /**
     * @param {object} data
     * @param {number} data.level
     */
    create(data) {
        this.sound.playMainTheme();

        const levelConfig = this.game.levels[data.level];

        this.addHud(levelConfig.specials)
            .addGrass(levelConfig.path)
            .addPath(levelConfig.path)
            .addEnemyEmitter(levelConfig)
            .addSpecialsEmitter(levelConfig.specials)
            .addTowersEmitter()
            .addPathWalkthrough(levelConfig.path);

        this.popupManager.addWalkthroughPopup();

        this.popupManager.once(this.popupManager.Events.QUEUE_END, () => {
            this.hud.rowCounter.start();
        });
    }

    /** @param {Position[]} path */
    addPathWalkthrough(path) {
        this.pathWalkthrough = new PathWalkthrough(this, path).startTween();

        return this;
    }

    /** @param {SpecialsConfig} specialsConfig */
    addHud(specialsConfig) {
        this.hud = new LevelHeadsUpDisplay(this, specialsConfig);

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

    /** @param {SpecialsConfig} specialsConfig */
    addSpecialsEmitter(specialsConfig) {
        this.specials = new SpecialsEmitter(this, this.enemies, specialsConfig);

        return this;
    }

    addTowersEmitter() {
        this.towers = new TowersEmitter(this, this.enemies, this.path);

        this.towers.start();

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

        for (const position of positions) {
            this.path.push(this.add.image(position.x, position.y, 'path'));
        }

        return this;
    }

    onRowsFinish() {
        this.sound.playWinSound();

        this.popupManager.addNotification('Level Completed')
            .once(Notification.Events.HIDE_FINISH, () => this.game.switchToScene(SceneKeys.LevelSelect));
    }
}