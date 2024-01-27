import Constants from "../../constants/constants.js";
import SceneKeys from "../../namespaces/sceneKeys.js";
import TextButton from "../buttons/textButton.js";
import CoinResource from "../entities/resources/coinResource.js";
import HeartResource from "../entities/resources/heartResource.js";
import TowerPicker from "../towerPicker/towerPicker.js";
import HeadsUpDisplay from "./headsUpDisplay.js";

export default class LevelHeadsUpDisplay extends HeadsUpDisplay {
    /** @param {import('../../scenes/level.js').default} scene */
    constructor(scene) {
        super(scene);

        this.addBackButton()
            .addResources()
            .addTowerPicker();
    }

    addBackButton() {
        this.backButton = new TextButton({
            scene: this.scene,
            text: 'Back',
            callback: () => this.scene.game.switchToScene(SceneKeys.LevelSelect),
            x: Constants.WIDTH * 0.9,
            y: Constants.HEIGHT * 0.9,
        });

        return this.add(this.backButton);
    }

    addTowerPicker() {
        this.towerPicker = new TowerPicker(this.scene);

        return this.add(this.towerPicker);
    }

    addResources() {
        this.heartResource = new HeartResource(this.scene, Constants.WIDTH * 0.33, Constants.HEIGHT * 0.05);
        this.coinResource = new CoinResource(this.scene, Constants.WIDTH * 0.67, Constants.HEIGHT * 0.05);

        return this.add([this.heartResource, this.coinResource]);
    }
}