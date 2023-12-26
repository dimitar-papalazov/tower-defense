import Constants from "../../constants/constants";
import ToggleButton from "../buttons/toggleButton";

export default class SpecialsCreate extends Phaser.GameObjects.Container {
    /** @param {import('../../scenes/create').default} scene */
    constructor(scene) {
        super(scene);

        this.addFireButton()
            .addIceButton()
            .setAlpha(0);

        this.scene.add.existing(this);
    }

    addFireButton() {
        this.fireButton = new ToggleButton({
            scene: this.scene,
            text: 'Fire',
            texture: 'flame',
            x: Constants.WIDTH * 0.33,
            y: Constants.HEIGHT * 0.67,
            width: 64,
            height: 64,
            callback: this.fireButtonCallback,
            context: this
        })

        return this.add(this.fireButton);
    }

    addIceButton() {
        this.iceButton = new ToggleButton({
            scene: this.scene,
            text: 'Ice',
            texture: 'ice',
            x: Constants.WIDTH * 0.67,
            y: Constants.HEIGHT * 0.67,
            width: 64,
            height: 64,
            callback: this.iceButtonCallback,
            context: this
        })

        return this.add(this.iceButton);
    }

    getSpecials() {
        return {
            fire: this.fireButton.toggled,
            ice: this.iceButton.toggled
        };
    }

    show() {
        this.scene.tweens.add({
            targets: this,
            alpha: 1,
            ease: Phaser.Math.Easing.Expo.In,
            duration: 200
        })
    }

    hide() {
        this.scene.tweens.add({
            targets: this,
            alpha: 0,
            ease: Phaser.Math.Easing.Expo.In,
            duration: 200
        })
    }
}