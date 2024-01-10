import Constants from "../../constants/constants.js";
import SceneKeys from "../../namespaces/sceneKeys.js";
import TextStyle from "../../namespaces/textStyle.js";
import TextButton from "../buttons/textButton.js";
import HeadsUpDisplay from "./headsUpDisplay.js";

export default class LevelSelectHeadsUpDisplay extends HeadsUpDisplay {
    /** @param {import('../../scenes/towerDefenseScene').default} scene */
    constructor(scene) {
        super(scene);

        this.addTitle()
            .addLevelButtons()
            .addBackButton();
    }

    addTitle() {
        this.title = this.scene.add.text(Constants.WIDTH * 0.5, Constants.HEIGHT * 0.33, 'Level Select', TextStyle.TitleSmall)
            .setOrigin(0.5);

        return this.add(this.title);
    }

    addLevelButtons() {
        const scene = this.scene;
        const x = Constants.WIDTH * 0.5;
        const y = Constants.HEIGHT * 0.5;
        const width = 105;
        const height = 45;
        const offset = height * 1.5;
        const length = this.scene.game.levels.length;

        this.levelButtons = [];

        for (let i = 0; i < length; i++) {
            this.levelButtons.push(new TextButton({
                scene,
                text: `Level ${i + 1}`,
                callback: () => console.log(`Level ${i + 1}`),
                x,
                y: y + offset * i,
                width,
                height
            }));
        }

        return this.add(this.levelButtons);
    }

    addBackButton() {
        this.backButton = new TextButton({
            scene: this.scene,
            text: 'Back',
            callback: () => this.scene.game.switchToScene(SceneKeys.Menu),
            x: Constants.WIDTH * 0.9,
            y: Constants.HEIGHT * 0.9,
        });

        return this.add(this.backButton);
    }
}