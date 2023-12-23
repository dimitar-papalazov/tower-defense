import Constants from "../constants/constants";
import TextStyle from "../namespaces/textStyle";
import TowerDefenseScene from "./towerDefenseScene";
import SceneKeys from "../namespaces/sceneKeys";

export default class Loading extends TowerDefenseScene {
    constructor() {
        super({ key: SceneKeys.Loading });
    }

    preload() {
        this.add.text(Constants.WIDTH * 0.5, Constants.HEIGHT * 0.5, 'Loading', TextStyle.Loading)
            .setOrigin(0.5);

        this.load.image('path', 'src/assets/images/path.png');
        this.load.image('grass', 'src/assets/images/grass.png');
        this.load.image('ice', 'src/assets/images/ice.png');
        
        this.load.spritesheet('flame', 'src/assets/spritesheets/flame.png', { frameWidth: 20, frameHeight: 26 });
        // TODO: percent loading
    }

    create() {
        this.game.switchToScene(SceneKeys.Menu);
    }
}