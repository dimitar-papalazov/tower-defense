import './typedefs/popupConfigs.js';
import GraphicsGenerator from '../graphicsGenerator/graphicsGenerator.js';


export default class Popup extends Phaser.GameObjects.Container {
    static Events = {
        HIDE_FINISH: 'hideFinish',
    }

    /** @param {PopupConfig} config */
    constructor(config) {
        super(config.scene, config.x, config.y);

        this.graphicsGenerator = new GraphicsGenerator(this.scene);
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

        this.emit(Popup.Events.HIDE_FINISH);

        this.destroy();
    }
}