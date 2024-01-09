import Constants from "../constants/constants";
import Color from "../namespaces/color";
import SceneKeys from "../namespaces/sceneKeys";
import Create from "../scenes/create";
import LevelSelect from "../scenes/levelSelect.js";
import Loading from "../scenes/loading";
import Menu from "../scenes/menu";
import './typedefs/levelConfig.js'

export default class TowerDefenseGame extends Phaser.Game {
    constructor() {
        super({
            width: Constants.WIDTH,
            height: Constants.HEIGHT,
            autoCenter: Phaser.Scale.Center.CENTER_BOTH,
            backgroundColor: Color.Number.LIGHT,
        });

        this.scene.add(SceneKeys.Loading, Loading);
        this.scene.add(SceneKeys.Menu, Menu);
        this.scene.add(SceneKeys.Create, Create);
        this.scene.add(SceneKeys.LevelSelect, LevelSelect);

        this.scene.start(SceneKeys.Loading);

        /** @type {LevelConfig[]} */
        this.levels = [];

        window.game = this;
    }

    /** @param {(typeof SceneKeys)[keyof typeof SceneKeys]} key */
    switchToScene(key) {
        const scenes = this.scene.scenes;

        for (const scene of scenes) {
            this.scene.stop(scene);
        }

        this.scene.start(key);
    }
}