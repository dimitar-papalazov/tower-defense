import Constants from "../../constants/constants.js";
import SceneKeys from "../../namespaces/sceneKeys.js";
import TextButton from "../buttons/textButton.js";
import HeadsUpDisplay from "./headsUpDisplay.js";

export default class LevelHeadsUpDisplay extends HeadsUpDisplay {
    /** @param {import('../../scenes/level.js').default} scene */
    constructor(scene) {
        super(scene);

        this.addBackButton();
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
}