import Constants from "../../constants/constants";
import SceneKeys from "../../namespaces/sceneKeys";
import TextStyle from "../../namespaces/textStyle";
import TextButton from "../buttons/textButton";
import HeadsUpDisplay from "./headsUpDisplay"

export default class MenuHeadsUpDisplay extends HeadsUpDisplay {
    /** @param {import('../../scenes/towerDefenseScene').default} scene */
    constructor(scene) {
        super(scene);

        this.addTitle()
            .addButtons();
    }

    addTitle() {
        this.title = this.scene.add.text(Constants.WIDTH * 0.5, Constants.HEIGHT * 0.33, 'TOWER DEFENSE', TextStyle.Title)
            .setOrigin(0.5);

        return this.add(this.title);
    }

    addButtons() {
        this.playButton = new TextButton({
            scene: this.scene,
            text: 'PLAY',
            callback: () => { console.log('play clicked') },
            x: Constants.WIDTH * 0.5,
            y: Constants.HEIGHT * 0.5,
            width: 105,
            height: 45
        });

        this.createButton = new TextButton({
            scene: this.scene,
            text: 'CREATE',
            callback: () => this.scene.scene.switch(SceneKeys.Create),
            x: Constants.WIDTH * 0.5,
            y: Constants.HEIGHT * 0.5 + this.playButton.height * 1.5,
            width: 105,
            height: 45
        });

        return this.add([this.playButton, this.createButton]);
    }
}