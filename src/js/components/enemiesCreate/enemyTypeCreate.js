import Constants from '../../constants/constants';
import Color from '../../namespaces/color';
import Enemy from '../../namespaces/enemy';
import TextStyle from '../../namespaces/textStyle';
import TextButton from '../buttons/textButton';
import GraphicsGenerator from '../graphicsGenerator/graphicsGenerator';

export default class EnemyTypeCreate extends Phaser.GameObjects.Container {
    /** 
     * @param {import('../../scenes/create').default} scene 
     * @param {number} x 
     * @param {number} y 
     * @param {string} type
     */
    constructor(scene, x, y, type) {
        super(scene, x, y);

        this.enemyType = type;
        this.count = 0;
        this.width = Constants.WIDTH * 0.16;
        this.height = Constants.HEIGHT * 0.13;

        this.addBackground()
            .addPlusButton()
            .addMinusButton()
            .addText()
            .addCountText()
            .addImage();

        this.scene.add.existing(this);
    }

    addBackground() {
        new GraphicsGenerator({
            color: Color.Number.ORANGE,
            height: this.height,
            key: 'enemy-type-create-background',
            lineWidth: this.height * 0.12,
            scene: this.scene, 
            width: this.width
        });

        this.background = this.scene.add.image(0, 0, 'enemy-type-create-background');

        return this.add(this.background);
    }

    addPlusButton() {
        this.plusButton = new TextButton({
            scene: this.scene,
            text: '+',
            x: this.width * 0.3,
            y: 0,
            callback: this.plusButtonCallback,
            context: this,
            width: 30,
            height: 30
        });

        return this.add(this.plusButton);
    }

    plusButtonCallback() {
        if (this.count === 10) {
            return; // TODO: notification
        }

        this.count++;

        this.countText.setText(this.count);
    }

    addMinusButton() {
        this.minusButton = new TextButton({
            scene: this.scene,
            text: '-',
            x: this.width * -0.3,
            y: 0,
            callback: this.minusButtonCallback,
            context: this,
            width: 30,
            height: 30
        });

        return this.add(this.minusButton);
    }

    minusButtonCallback() {
        if (this.count === 0) {
            return; // TODO: notification
        }

        this.count--;

        this.countText.setText(this.count);
    }

    addText() {
        const text = this.enemyType === Enemy.CREEP ? 'Creep' : this.enemyType === Enemy.ARMORED_CREEP ? 'Armored' : 'Absorber';

        this.text = this.scene.add
            .text(0, this.height * -0.33, text, TextStyle.ButtonSmall)
            .setOrigin(0.5);

        return this.add(this.text);
    }

    addCountText() {
        this.countText = this.scene.add
            .text(0, this.height * 0.33, this.count, TextStyle.ButtonSmall)
            .setOrigin(0.5);

        return this.add(this.countText);
    }

    addImage() {
        this.image = this.scene.add.image(0, 0, `${this.enemyType}Front`, 1)
            .setScale(2);

        return this.add(this.image);
    }
}