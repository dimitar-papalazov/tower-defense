import Color from "../../namespaces/color.js";
import TextStyle from "../../namespaces/textStyle.js";
import Button from "./button.js";
import './typedefs/buttonConfig.js'

export default class TimerButton extends Button {
    /** @param {TimerButtonConfig} config */
    constructor(config) {
        super(config);

        this.ms = config.ms ?? 60000;

        this.setupDefaults(config)
            .generateKey(config.text, config.color)
            .generateTexture(config.color)
            .addBackground()
            .addText(config.text, config.textStyle)
            .addImage(config.texture)
            .addOverlay()
            .addOverlayText()
            .setInteractivity()
    }

    /**
     * @override
     * @param {TextButtonConfig} config
     */
    setupDefaults(config) {
        config.textStyle = TextStyle.ButtonSmall;
        config.color = Color.Number.BEIGE;

        if (typeof config.textStyle.fontSize === 'string') {
            config.textStyle.fontSize = parseInt(config.textStyle.fontSize.replace('px', ''));
        }

        return this;
    }

    /** 
     * @override
     * @param {string} text 
     * @param {number} color
     */
    generateKey(text, color) {
        this.key = `timer-button-${text.split(' ').join('-').toLowerCase()}-${color}-${this.width}-${this.height}`;

        return this;
    }

    /**
     * @param {string} text
     * @param {Phaser.Types.GameObjects.Text.TextStyle} textStyle
     */
    addText(text, textStyle) {
        this.text = this.scene.add.text(0, this.height * 0.25, text, textStyle)
            .setOrigin(0.5);

        return this.add(this.text);
    }

    /** @param {string} text */
    addImage(texture) {
        this.image = this.scene.add.image(0, this.height * -0.2, texture)

        return this.add(this.image);
    }

    addOverlay() {
        this.overlay = this.scene.add
            .image(0, 0, '__WHITE')
            .setAlpha(0)
            .setTint(Color.Number.BLACK)
            .setDisplaySize(this.width, this.height);

        return this.add(this.overlay);
    }

    addOverlayText() {
        this.overlayText = this.scene.add
            .text(0, 0, '', TextStyle.ButtonTimer)
            .setOrigin(0.5)
            .setAlpha(0);

        return this.add(this.overlayText);
    }

    /** @override */
    onPointerUpComplete() {
        if (!this.clicked || this.timer) {
            return;
        }

        this.startTimer();

        this.callback.apply(this.context, this.params);
    }

    startTimer() {
        this.timeLeft = this.ms;

        this.updateTime();

        this.timer = this.scene.time.addEvent({
            delay: 1000,
            callback: this.onTick,
            callbackScope: this,
            loop: true
        });
    }

    onTick() {
        this.timeLeft -= 1000;
        this.updateTime();

        if (this.timeLeft > 0) {
            return;
        }

        this.timer.destroy();

        this.overlay.setAlpha(0);

        this.overlayText.setAlpha(0);
    }

    updateTime() {
        this.overlay.setAlpha(0.7);

        this.overlayText
            .setAlpha(1)
            .setText(Math.round(this.timeLeft / 1000).toString());
    }
}