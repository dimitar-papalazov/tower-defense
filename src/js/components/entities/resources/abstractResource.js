import Constants from '../../../constants/constants.js';
import Color from '../../../namespaces/color.js';
import TextStyle from '../../../namespaces/textStyle.js';
import GraphicsGenerator from '../../graphicsGenerator/graphicsGenerator.js';
import './typedefs/abstractResourceConfig.js';

export default class AbstractResource extends Phaser.GameObjects.Container {
    /** @param {AbstractResourceConfig} config */
    constructor(config) {
        super(config.scene, config.x, config.y);
        /** @type {import('../../../scenes/level.js').default} */
        this.scene;

        this.type = config.type;
        this.value = config.value;
        this.graphicsGenerator = new GraphicsGenerator(this.scene);
        this.width = Constants.WIDTH * 0.1;
        this.height = Constants.HEIGHT * 0.05;

        this.addBackground()
            .addImage()
            .addText();
    }

    /** @private */
    addBackground() {
        const key = 'resource-background';

        this.graphicsGenerator.generate({
            color: Color.Number.LIGHT,
            height: this.height,
            key,
            width: this.width
        });

        this.background = this.scene.add.image(0, 0, key);

        return this.add(this.background);
    }

    /** @private */
    addImage() {
        this.image = this.scene.add.image(-this.width * 0.25, 0, this.type);

        return this.add(this.image);
    }

    /** @private */
    addText() {
        this.text = this.scene.add
            .text(this.width * 0.4, 0, this.value, TextStyle.Resource)
            .setOrigin(1, 0.5);

        return this.add(this.text);
    }

    /** @private */
    updateValue(value) {
        const startValue = this.value;

        this.value = value;

        this.scene.tweens.addCounter({
            duration: 200,
            from: startValue,
            to: value,
            onUpdate: tween => this.text.setText(tween.getValue().toFixed(0))
        })
    }

    /** @param {number} value */
    decreaseValue(value) {
        value = this.value - value;

        if (value < 0) {
            value = 0;
        }

        this.updateValue(value);
    }

    /** @param {number} value */
    increaseValue(value) {
        value = this.value + value;

        this.updateValue(value);
    }
}