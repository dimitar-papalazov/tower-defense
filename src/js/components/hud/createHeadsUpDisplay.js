import Constants from "../../constants/constants";
import SceneKeys from "../../namespaces/sceneKeys";
import TextButton from "../buttons/textButton";
import PathCreate from "../pathCreate/pathCreate";
import HeadsUpDisplay from "./headsUpDisplay"

export default class CreateHeadsUpDisplay extends HeadsUpDisplay {
    /** @param {import('../../scenes/towerDefenseScene').default} scene */
    constructor(scene) {
        super(scene);

        this.pathCreate = new PathCreate(this.scene);

        this.saveButton = this.addTextButton(Constants.WIDTH * 0.1, Constants.HEIGHT * 0.9, 'Save', this.saveCallback);
        this.pathButton = this.addTextButton(Constants.WIDTH * 0.3, Constants.HEIGHT * 0.9, 'Path', this.pathCallback);
        this.specialsButton = this.addTextButton(Constants.WIDTH * 0.5, Constants.HEIGHT * 0.9, 'Specials', this.specialsCallback);
        this.enemiesButton = this.addTextButton(Constants.WIDTH * 0.7, Constants.HEIGHT * 0.9, 'Enemies', this.enemiesCallback);
        this.backButton = this.addTextButton(Constants.WIDTH * 0.9, Constants.HEIGHT * 0.9, 'Back', this.switchToMenu);
    }

    /**
     * @override
     * @param {number} x
     * @param {number} y
     * @param {string} text
     * @param {Function} callback
     */
    addTextButton(x, y, text, callback) {
        const button = new TextButton({ scene: this.scene, x, y, width: 123, text, callback, context: this });

        this.add(button);

        return button;
    }

    saveCallback() {
        console.log('save clicked', this.pathCreate.points)
    }

    pathCallback() {
        if (this.pathToggled) {
            this.pathToggled = false;

            return this.showChildren();
        }

        this.hideChildren(this.pathButton);

        this.pathToggled = true;

        this.pathCreate.enable();
    }

    specialsCallback() {
        if (this.specialsToggled) {
            this.specialsToggled = false;
            return this.showChildren();
        }

        this.hideChildren(this.specialsButton);

        this.specialsToggled = true;
    }

    enemiesCallback() {
        if (this.enemiesToggled) {
            this.enemiesToggled = false;
            return this.showChildren();
        }

        this.hideChildren(this.enemiesButton);

        this.enemiesToggled = true;
    }

    switchToMenu() {
        this.scene.game.switchToScene(SceneKeys.Menu);
    }
}