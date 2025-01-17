import TowerDefenseSoundManager from "../components/sound/towerDefenseSoundManager.js";
import Constants from "../constants/constants";
import Color from "../namespaces/color";
import SceneKeys from "../namespaces/sceneKeys";
import Create from "../scenes/create";
import Level from "../scenes/level.js";
import LevelSelect from "../scenes/levelSelect.js";
import Loading from "../scenes/loading";
import Menu from "../scenes/menu";
import './typedefs/levelConfig.js';

export default class TowerDefenseGame extends Phaser.Game {
    constructor() {
        super({
            width: Constants.WIDTH,
            height: Constants.HEIGHT,
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH
            },
            backgroundColor: Color.Number.LIGHT,
            render: {
                pixelArt: true
            }
        });

        this.scene.add(SceneKeys.Loading, Loading);
        this.scene.add(SceneKeys.Menu, Menu);
        this.scene.add(SceneKeys.Create, Create);
        this.scene.add(SceneKeys.LevelSelect, LevelSelect);
        this.scene.add(SceneKeys.Level, Level);

        this.scene.start(SceneKeys.Loading);

        /** @type {LevelConfig[]} */
        this.levels = [];

        this.sound = new TowerDefenseSoundManager(this);

        window.game = this;
    }

    /** 
     * @param {(typeof SceneKeys)[keyof typeof SceneKeys]} key
     * @param {object} data
     * @param {boolean} playSound
     */
    switchToScene(key, data, playSound = true) {
        const scenes = this.scene.scenes;

        for (const scene of scenes) {
            this.scene.stop(scene);
        }

        this.scene.start(key, data);

        if (playSound) {
            this.sound.playTransition();
        }
    }
}