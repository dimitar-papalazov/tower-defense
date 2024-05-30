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
import '../../game/typedefs/levelConfig.js';

export default class LevelHeadsUpDisplay extends HeadsUpDisplay {
    /** 
     * @param {import('../../scenes/level.js').default} scene 
     * @param {SpecialsConfig} specialsConfig 
     */
    constructor(scene, specialsConfig) {
        super(scene);
        /** @type {import('../../scenes/level.js').default} */
        this.scene;

        this.addBackButton()
            .addSpecialsButtons(specialsConfig)
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

    /** @param {SpecialsConfig} specialsConfig */
    addSpecialsButtons(specialsConfig) {
        this.specialsButton = new TextButton({
            scene: this.scene,
            text: 'Specials',
            callback: this.toggleSpecials,
            context: this,
            x: Constants.WIDTH * 0.15,
            y: Constants.HEIGHT * 0.9,
        });

        if (!specialsConfig.fire && !specialsConfig.ice) {
            this.specialsButton.setVisible(false);
        }

        this.fireButton = new TimerButton({
            scene: this.scene,
            text: 'Fire',
            texture: 'flame',
            width: 64,
            height: 64,
            x: Constants.WIDTH * 0.45,
            y: Constants.HEIGHT * 0.9,
            callback: () => this.scene.specials.startFire(),
            enabled: specialsConfig.fire
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
            enabled: specialsConfig.ice
        }).setAlpha(0);

        this.specialsButtonsVisible = false;

        return this.add([this.specialsButton, this.fireButton, this.iceButton]);
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
            const buttons = [this.fireButton, this.iceButton];
            const enabled = buttons.filter(button => button.enabled);
            const disabled = buttons.filter(button => !button.enabled);

            this.scene.tweens.add({
                targets: enabled,
                alpha: 1,
                duration: 200,
                onComplete: () => this.specialsButtonsVisible = true
            });

            this.scene.tweens.add({
                targets: disabled,
                alpha: 0.5,
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
        this.scene.sound.playLoseLevel();

        this.scene.popupManager.addNotification('You lost all your hearts!\nLevel failed!')
            .once(Notification.Events.HIDE_FINISH, () => this.scene.game.switchToScene(SceneKeys.LevelSelect));
    }

    addRowCounter() {
        this.rowCounter = new RowCounter(this.scene)
            .once(RowCounter.Events.START, this.onRowCounterStart, this)
            .once(RowCounter.Events.END, this.onRowCounterEnd, this);

        return this.add(this.rowCounter);
    }

    onRowCounterStart() {
        this.fireButton.ms = Constants.ROW_ANIMATION_PERIOD * Constants.ROW_COUNTER_COUNT * 2;
        this.iceButton.ms = Constants.ROW_ANIMATION_PERIOD * Constants.ROW_COUNTER_COUNT * 2;

        this.fireButton.startTimer();
        this.iceButton.startTimer();
    }

    onRowCounterEnd() {
        this.fireButton.ms = Constants.TIMER_BUTTON_MS;
        this.iceButton.ms = Constants.TIMER_BUTTON_MS;

        this.scene.pathWalkthrough.stopTween();
    }

    destroy(fromScene) {
        this.scene.sound.stopFire();
        this.scene.sound.stopIce();
        this.scene.sound.stopTicking();
        this.scene.sound.stopMarch();

        super.destroy(fromScene);
    }
}