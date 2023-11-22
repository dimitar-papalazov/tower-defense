import Constants from "../constants/constants";
import Color from "../namespaces/color";
import SceneKeys from "../namespaces/sceneKeys";
import Create from "../scenes/create";
import Loading from "../scenes/loading";
import Menu from "../scenes/menu";

export default class TowerDefenseGame extends Phaser.Game {
    constructor() {
        super({
            width: Constants.WIDTH,
            height: Constants.HEIGHT,
            autoCenter: Phaser.Scale.Center.CENTER_BOTH,
            backgroundColor: Color.Number.LIGHT,
        });

        this.scene.add(SceneKeys.Loading, new Loading());
        this.scene.add(SceneKeys.Menu, new Menu());
        this.scene.add(SceneKeys.Create, new Create());

        this.scene.start(SceneKeys.Loading);

        window.game = this;
    }
}