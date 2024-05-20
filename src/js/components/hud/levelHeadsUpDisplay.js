import Constants from "../../constants/constants.js";
import SceneKeys from "../../namespaces/sceneKeys.js";
import TextButton from "../buttons/textButton.js";
import TimerButton from "../buttons/timerButton.js";
import CoinResource from "../entities/resources/coinResource.js";
import HeartResource from "../entities/resources/heartResource.js";
import Notification from "../popup/notification.js";
import RowCounter from "../rowCounter/rowCounter.js";
import TowerPicker from "../towerPicker/towerPicker.js";
import HeadsUpDisplay from "./headsUpDisplay.js";

export default class LevelHeadsUpDisplay extends HeadsUpDisplay {
    /** @param {import('../../scenes/level.js').default} scene */
    constructor(scene) {
        super(scene);
        /** @type {import('../../scenes/level.js').default} */
        this.scene;

        this.addBackButton()
            .addSpecialsButton()
            .addSpecialsButtons()
            .addResources()
            .addTowerPicker()
            .addRowCounter();
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

    addSpecialsButton() {
        this.specialsButton = new TextButton({
            scene: this.scene,
            text: 'Specials',
            callback: this.toggleSpecials,
            context: this,
            x: Constants.WIDTH * 0.15,
            y: Constants.HEIGHT * 0.9,
        });

        return this.add(this.specialsButton);
    }

    addSpecialsButtons() {
        this.fireButton = new TimerButton({
            scene: this.scene,
            text: 'Fire',
            texture: 'flame',
            width: 64,
            height: 64,
            x: Constants.WIDTH * 0.45,
            y: Constants.HEIGHT * 0.9,
            callback: () => this.scene.specials.startFire(),
        }).setAlpha(0);

        this.iceButton = new TimerButton({
            scene: this.scene,
            text: 'Ice',
            texture: 'ice',
            width: 64,
            height: 64,
            callback: () => this.scene.specials.startIce(),
            x: Constants.WIDTH * 0.55,
            y: Constants.HEIGHT * 0.9,
        }).setAlpha(0);

        this.specialsButtonsVisible = false;

        return this.add([this.fireButton, this.iceButton]);
    }

    toggleSpecials() {
        if (this.specialsButtonsVisible) {
            this.scene.tweens.add({
                targets: [this.fireButton, this.iceButton],
                alpha: 0,
                duration: 200,
                onComplete: () => this.specialsButtonsVisible = false
            });
        } else {
            this.scene.tweens.add({
                targets: [this.fireButton, this.iceButton],
                alpha: 1,
                duration: 200,
                onComplete: () => this.specialsButtonsVisible = true
            });
        }
    }

    addTowerPicker() {
        this.towerPicker = new TowerPicker(this.scene);

        return this.add(this.towerPicker);
    }

    addResources() {
        this.heartResource = new HeartResource(this.scene, Constants.WIDTH * 0.33, Constants.HEIGHT * 0.05)
            .once(HeartResource.Events.NO_HEARTS, this.onNoHearts, this);
        this.coinResource = new CoinResource(this.scene, Constants.WIDTH * 0.67, Constants.HEIGHT * 0.05);

        return this.add([this.heartResource, this.coinResource]);
    }

    onNoHearts() {
        this.scene.popupManager.addNotification('You lost all your hearts!\nLevel failed!')
            .once(Notification.Events.HIDE_FINISH, () => this.scene.game.switchToScene(SceneKeys.LevelSelect));
    }

    addRowCounter() {
        this.rowCounter = new RowCounter(this.scene);

        return this.add(this.rowCounter);
    }
}