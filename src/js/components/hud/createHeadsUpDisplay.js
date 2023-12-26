import Constants from "../../constants/constants";
import SceneKeys from "../../namespaces/sceneKeys";
import TextButton from "../buttons/textButton";
import EnemiesCreate from "../enemiesCreate/enemiesCreate";
import PathCreate from "../pathCreate/pathCreate";
import SpecialsCreate from "../specialsCreate/specialsCreate";
import HeadsUpDisplay from "./headsUpDisplay"

export default class CreateHeadsUpDisplay extends HeadsUpDisplay {
    /** @param {import('../../scenes/towerDefenseScene').default} scene */
    constructor(scene) {
        super(scene);

        this.pathCreate = new PathCreate(this.scene);
        this.specialsCreate = new SpecialsCreate(scene);
        this.enemiesCreate = new EnemiesCreate(scene);

        this.saveButton = this.addTextButton(Constants.WIDTH * 0.1, 'Save', this.saveCallback);
        this.pathButton = this.addTextButton(Constants.WIDTH * 0.3, 'Path', this.pathCallback);
        this.specialsButton = this.addTextButton(Constants.WIDTH * 0.5, 'Specials', this.specialsCallback);
        this.enemiesButton = this.addTextButton(Constants.WIDTH * 0.7, 'Enemies', this.enemiesCallback);
        this.backButton = this.addTextButton(Constants.WIDTH * 0.9, 'Back', this.switchToMenu);
    }

    /**
     * @override
     * @param {number} x
     * @param {string} text
     * @param {Function} callback
     */
    addTextButton(x, text, callback) {
        const button = new TextButton({ scene: this.scene, x, y: Constants.HEIGHT * 0.9, width: 123, text, callback, context: this });

        this.add(button);

        return button;
    }

    saveCallback() {
        const result = {
            path: this.pathCreate.getVectors(),
            specials: this.specialsCreate.getSpecials(),
            enemies: this.enemiesCreate.getRows(),
        };
        
        console.log('save clicked', JSON.stringify(result));
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

            this.specialsCreate.hide();

            return this.showChildren();
        }

        this.hideChildren(this.specialsButton);

        this.specialsToggled = true;

        this.specialsCreate.show();
    }

    enemiesCallback() {
        if (this.enemiesToggled) {
            this.enemiesToggled = false;

            this.enemiesCreate.hide();

            return this.showChildren();
        }

        this.hideChildren(this.enemiesButton);

        this.enemiesToggled = true;

        this.enemiesCreate.show();
    }

    switchToMenu() {
        this.scene.game.switchToScene(SceneKeys.Menu);
    }
}