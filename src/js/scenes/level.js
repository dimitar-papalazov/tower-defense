import Constants from "../constants/constants";
import SceneKeys from "../namespaces/sceneKeys";
import TowerDefenseScene from "./towerDefenseScene";
import '../game/typedefs/levelConfig.js'
import EnemiesEmitter from "../components/enemiesEmitter/enemiesEmitter.js";
import LevelHeadsUpDisplay from "../components/hud/levelHeadsUpDisplay.js";
import AbstractTower from "../components/sprites/towers/abstractTower.js";
import Tower from "../namespaces/tower.js";

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
            .addGrass()
            .addPath(levelConfig.path)
            .addEnemyEmitter(levelConfig);

        const tower = new AbstractTower({
            scene: this,
            x: 285,
            y: 255,
            type: Tower.NORMAL
        });

        this.enemies.on(EnemiesEmitter.Events.ENEMY_MOVED, () => {
            const enemy = this.enemies.enemies.find(e => e.active && tower.isInRange(e));

            if (enemy !== undefined) {
                tower.fireAnimation(enemy)
            }
        });
    }

    addHud() {
        this.hud = new LevelHeadsUpDisplay(this);

        return this;
    }

    /** @param {LevelConfig} levelConfig */
    addEnemyEmitter(levelConfig) {
        this.enemies = new EnemiesEmitter(this, levelConfig.enemies, levelConfig.path);

        this.enemies.start();

        return this;
    }

    addGrass() {
        const halfTileSize = Constants.TILE_SIZE * 0.5;
        const maxX = Constants.WIDTH / Constants.TILE_SIZE;
        const maxY = Constants.HEIGHT / Constants.TILE_SIZE;

        for (let i = 0; i < maxX; i++) {
            for (let j = 0; j < maxY; j++) {
                const x = i * Constants.TILE_SIZE + halfTileSize;
                const y = j * Constants.TILE_SIZE + halfTileSize;

                this.add.image(x, y, 'grass');
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
}