import Constants from '../../constants/constants.js';
import Color from '../../namespaces/color.js';
import TextStyle from '../../namespaces/textStyle.js';
import Popup from './popup.js';
import './typedefs/popupConfigs.js';

export default class Notification extends Popup {
    static Events = {
        HIDE_FINISH: 'hideFinish',
    }

    /** @param {NotificationConfig} config */
    constructor(config) {
        config.x = config.x ?? Constants.WIDTH * 0.5;
        config.y = config.y ?? Constants.HEIGHT * 0.2;

        super(config);

        this.addText(config.text)
            .addBackground()
            .setDepth(Constants.POPUP_DEPTH);
    }

    addBackground() {
        if (this.width === 0 || this.height === 0) {
            this.width = this.text.width * 1.6;
            this.height = this.text.height * 1.6;
        }

        const key = `notification-background-${this.width}-${this.height}`;

        this.graphicsGenerator.generate({
            color: Color.Number.YELLOW,
            width: this.width,
            height: this.height,
            lineWidth: this.height * 0.12,
            key,
        });

        this.background = this.scene.add.image(0, 0, key);

        return this.addAt(this.background);
    }

    /** @param {string} text */
    addText(text) {
        this.text = this.scene.add
            .text(0, 0, text, TextStyle.Popup)
            .setOrigin(0.5);

        return this.add(this.text);
    }

    showAnimation() {
        this.setAlpha(0);

        this.scene.add.tween({
            targets: this,
            ease: Phaser.Math.Easing.Expo.In,
            alpha: 1,
            duration: 200,
            onComplete: this.onAlphaInComplete,
            callbackScope: this
        });
    }

    onAlphaInComplete() {
        if (!this.active) {
            return;
        }

        this.scene.add.tween({
            targets: this,
            ease: Phaser.Math.Easing.Expo.In,
            alpha: 0,
            duration: 200,
            delay: 2000,
            onComplete: this.onAlphaOutComplete,
            callbackScope: this
        });
    }

    onAlphaOutComplete() {
        if (!this.active) {
            return
        }

        this.emit(Notification.Events.HIDE_FINISH);

        this.destroy();
    }
}