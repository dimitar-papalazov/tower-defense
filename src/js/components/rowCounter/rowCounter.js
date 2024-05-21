import Constants from "../../constants/constants.js";
import TextStyle from "../../namespaces/textStyle.js";

export default class RowCounter extends Phaser.GameObjects.Text {
    static Events = {
        START: 'start',
        END: 'end'
    }

    /** @param {import('../../scenes/level.js').default} scene  */
    constructor(scene) {
        super(scene, Constants.WIDTH * 0.5, Constants.HEIGHT * 0.5, Constants.ROW_COUNTER_COUNT, TextStyle.RowCounter);
        /** @type {import('../../scenes/level.js').default} */
        this.scene;

        this.counter = Constants.ROW_COUNTER_COUNT;

        this.Events = RowCounter.Events;

        this.setOrigin(0.5)
            .setAlpha(0);
    }

    start() {
        this.emit(this.Events.START);

        this.scene.tweens.add({
            targets: this,
            alpha: 1,
            duration: Constants.ROW_ANIMATION_PERIOD,
            onComplete: this.count,
            callbackScope: this,
            ease: Phaser.Math.Easing.Expo.In
        })

        return this;
    }

    /** @private */
    count() {
        if (this.counter === 1) {
            this.destroyTween();

            return;
        }

        this.counter--;

        this.hideTween();
    }

    /** @private */
    hideTween() {
        this.scene.tweens.add({
            targets: this,
            alpha: 0,
            duration: Constants.ROW_ANIMATION_PERIOD * 0.5,
            onComplete: this.showTween,
            callbackScope: this,
            ease: Phaser.Math.Easing.Expo.In
        });
    }

    /** @private */
    showTween() {
        this.setText(this.counter);

        this.scene.tweens.add({
            targets: this,
            alpha: 1,
            duration: Constants.ROW_ANIMATION_PERIOD * 0.5,
            onComplete: this.count,
            callbackScope: this,
            ease: Phaser.Math.Easing.Expo.In
        });
    }

    /** @private */
    destroyTween() {
        this.scene.tweens.add({
            targets: this,
            alpha: 0,
            duration: Constants.ROW_ANIMATION_PERIOD,
            onComplete: this.end,
            callbackScope: this,
            ease: Phaser.Math.Easing.Expo.In
        });
    }

    /** @private */
    end() {
        this.emit(this.Events.END);

        this.destroy();
    }
}