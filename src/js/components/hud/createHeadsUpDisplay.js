import Constants from "../../constants/constants";
import SceneKeys from "../../namespaces/sceneKeys";
import TextButton from "../buttons/textButton";
import HeadsUpDisplay from "./headsUpDisplay"

export default class CreateHeadsUpDisplay extends HeadsUpDisplay {
    /** @param {import('../../scenes/towerDefenseScene').default} scene */
    constructor(scene) {
        super(scene);

        this.addBackButton()
            .addPathButton();
    }

    addBackButton() {
        this.backButton = new TextButton({
            scene: this.scene,
            text: 'Back',
            callback: () => this.scene.scene.switch(SceneKeys.Menu),
            x: Constants.WIDTH * 0.1,
            y: Constants.HEIGHT * 0.9
        });

        return this.add(this.backButton);
    }

    addPathButton() {
        this.pathButton = new TextButton({
            scene: this.scene,
            text: 'Path',
            callback: () => {},
            x: Constants.WIDTH * 0.9,
            y: Constants.HEIGHT * 0.5
        })

        return this.add(this.pathButton);
    }
}