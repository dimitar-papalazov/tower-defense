import CreateHeadsUpDisplay from "../components/hud/createHeadsUpDisplay";
import Constants from "../constants/constants";
import SceneKeys from "../namespaces/sceneKeys";
import TowerDefenseScene from "./towerDefenseScene";

export default class Create extends TowerDefenseScene {
    constructor() {
        super({ key: SceneKeys.Create });
    }

    create() {
        this.addGrass();

        this.hud = new CreateHeadsUpDisplay(this);
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
}