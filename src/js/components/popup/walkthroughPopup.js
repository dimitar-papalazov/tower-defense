import './typedefs/popupConfigs.js';
import Constants from "../../constants/constants.js";
import Color from "../../namespaces/color.js";
import Popup from "./popup.js";
import TextStyle from '../../namespaces/textStyle.js';

export default class WalkthroughPopup extends Popup {
    /** @param {PopupConfig} config */
    constructor(config) {
        config.x = Constants.WIDTH * 0.5;
        config.y = Constants.HEIGHT * 0.5;

        super(config);

        this.width = Constants.WIDTH * 0.6;
        this.height = Constants.HEIGHT * 0.25;

        this.addTransparentInteractivity()
            .addBackground()
            .addText()
            .setDepth(Constants.POPUP_DEPTH);
    }

    addTransparentInteractivity() {
        this.transparentInteractivity = this.scene.add.image(0, 0, '__WHITE')
            .setDisplaySize(Constants.WIDTH, Constants.HEIGHT)
            .setAlpha(0.2)
            .setTint(0x000000)
            .setInteractive()
            .on(Phaser.Input.Events.POINTER_DOWN, this.onPointerDown, this)
            .disableInteractive();

        return this.add(this.transparentInteractivity);
    }

    addBackground() {
        const key = 'walkthrough-background';

        this.graphicsGenerator.generate({
            color: Color.Number.YELLOW,
            height: this.height,
            width: this.width,
            lineWidth: this.height * 0.12,
            key
        });

        this.background = this.scene.add.image(0, 0, key);

        return this.add(this.background);
    }

    addText() {
        this.text = this.scene.add
            .text(0, 0, 'best for battling\nideal for defeating\nperfect against', TextStyle.WalkthroughPopup)
            .setOrigin(0.5);

        this.greenTowerText = this.scene.add
            .text(-151, -26, 'Green Tower', TextStyle.WalkthroughPopupGreen)
            .setOrigin(0.5);

        this.greenEnemiesText = this.scene.add
            .text(162, -26, 'Green Enemies', TextStyle.WalkthroughPopupGreen)
            .setOrigin(0.5);

        this.blackTowerText = this.scene.add
            .text(-160, 0, 'Black Tower', TextStyle.WalkthroughPopupBlack)
            .setOrigin(0.5);

        this.blackEnemiesText = this.scene.add
            .text(171, 0, 'Black Enemies', TextStyle.WalkthroughPopupBlack)
            .setOrigin(0.5);

        this.blueTowerText = this.scene.add
            .text(-135, 26, 'Blue Tower', TextStyle.WalkthroughPopupBlue)
            .setOrigin(0.5);

        this.blueEnemiesText = this.scene.add
            .text(145, 26, 'Blue Enemies', TextStyle.WalkthroughPopupBlue)
            .setOrigin(0.5);

        return this.add([
            this.text,
            this.greenTowerText,
            this.greenEnemiesText,
            this.blackTowerText,
            this.blackEnemiesText,
            this.blueTowerText,
            this.blueEnemiesText
        ]);
    }

    /** @override */
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

    /** @override */
    onAlphaInComplete() {
        if (!this.active) {
            return;
        }

        this.transparentInteractivity.setInteractive();
    }

    onPointerDown() {
        if (!this.active) {
            return;
        }

        this.scene.add.tween({
            targets: this,
            ease: Phaser.Math.Easing.Expo.In,
            alpha: 0,
            duration: 200,
            onComplete: this.onAlphaOutComplete,
            callbackScope: this
        });
    }

    /** @override */
    onAlphaOutComplete() {
        if (!this.active) {
            return
        }

        this.emit(Popup.Events.HIDE_FINISH);

        this.destroy();
    }
}