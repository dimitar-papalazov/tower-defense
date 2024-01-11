import Constants from "../constants/constants";
import SceneKeys from "../namespaces/sceneKeys";
import TowerDefenseScene from "./towerDefenseScene";
import '../game/typedefs/levelConfig.js'
import EnemiesEmitter from "../components/enemiesEmitter/enemiesEmitter.js";

export default class Level extends TowerDefenseScene {
    constructor() {
        super({ key: SceneKeys.Level });
    }

    /**
     * @param {object} data
     * @param {number} data.level
     */
    create(data) {
        const levelInfo = this.game.levels[data.level];

        this.addGrass();
        this.addPath(levelInfo.path);

        this.enemies = new EnemiesEmitter(this, levelInfo.enemies, this.positions);

        this.enemies.start();
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
    }

    /** @param {Position[]} positions */
    addPath(positions) {
        this.positions = positions;
        this.path = [];

        for(const position of this.positions) {
            this.path.push(this.add.image(position.x, position.y, 'path'));
        }
    }
}