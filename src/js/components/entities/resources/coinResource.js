import AbstractResource from "./abstractResource.js";
import Resource from '../../../namespaces/resource.js';
import Constants from "../../../constants/constants.js";
import TextStyle from "../../../namespaces/textStyle.js";

export default class CoinResource extends AbstractResource {
    /**
     * @param {import('../../../scenes/level.js').default} scene
     * @param {number} x
     * @param {number} y
     */
    constructor(scene, x, y) {
        super({
            scene,
            x,
            y,
            type: Resource.COIN,
            value: 1000,
        });
    }

    canBuyTower() {
        return this.value - Constants.TOWER_COST >= 0;
    }

    /** 
     * @override
     * @param {number} value 
     */
    increaseValue(value) {
        super.increaseValue(value);

        const text = this.scene.add
            .text(0, 60, `+${value} coins`, TextStyle.ResourceReward)
            .setOrigin(0.5);

        this.add(text);

        this.scene.tweens.add({
            targets: text,
            y: 30,
            alpha: 0,
            duration: 2000,
            ease: Phaser.Math.Easing.Expo.InOut,
            onComplete: () => text.destroy()
        });
    }
}