import Constants from "../../constants/constants.js";
import Color from "../../namespaces/color.js";
import Resource from "../../namespaces/resource.js";
import TextStyle from "../../namespaces/textStyle.js";
import Tower from "../../namespaces/tower.js";
import TextButton from "../buttons/textButton.js";
import GraphicsGenerator from "../graphicsGenerator/graphicsGenerator.js";

export default class TowerPicker extends Phaser.GameObjects.Container {
    static Events = {
        TYPE_SELECT: 'typeSelect'
    }

    /**
     * @param {import('../../scenes/level.js').default} scene
     * @param {number} x
     * @param {number} y
     */
    constructor(scene, x = Constants.WIDTH * 0.5, y = Constants.HEIGHT * 0.8) {
        super(scene, x, y);
        /** @type {import('../../scenes/level.js').default} */
        this.scene;

        this.Events = TowerPicker.Events;
        this.graphicsGenerator = new GraphicsGenerator(this.scene);

        this.addBackground()
            .addTypes()
            .addCancelButton()
            .setAlpha(0);
    }

    addCancelButton() {
        this.cancelButton = new TextButton({
            scene: this.scene,
            text: 'Cancel',
            callback: this.hide,
            context: this,
            x: this.width * 0.44,
            y: this.height * 0.38,
            textStyle: TextStyle.ButtonSmall
        });

        return this.add(this.cancelButton);
    }

    addBackground() {
        this.width = Constants.WIDTH * 0.8;
        this.height = Constants.HEIGHT * 0.2;

        const key = 'tower-picker-background';

        this.graphicsGenerator.generate({
            color: Color.Number.YELLOW,
            width: this.width,
            height: this.height,
            key
        });

        this.background = this.scene.add.image(0, 0, key)
            .setInteractive();

        return this.add(this.background);
    }

    addTypes() {
        this.typeBackground = 'tower-picker-type-background';

        this.graphicsGenerator.generate({
            color: Color.Number.ORANGE,
            width: Constants.WIDTH * 0.08,
            height: Constants.HEIGHT * 0.11,
            key: this.typeBackground,
        });

        const types = Object.values(Tower);
        const startX = -this.width * 0.33;
        const offsetX = this.width * 0.33

        for (let i = 0; i < types.length; i++) {
            this.addTower(startX + offsetX * i, types[i]);
        }

        return this;
    }

    addTower(x, type) {
        const background = this.scene.add.image(x, 0, this.typeBackground);
        const image = this.scene.add.image(x, Constants.HEIGHT * -0.02, type);
        const resourceValue = this.scene.add.text(x + Constants.WIDTH * 0.015, Constants.HEIGHT * 0.03, 100, TextStyle.Resource)
            .setOrigin(0.5);
        const resourceImage = this.scene.add.image(x - Constants.WIDTH * 0.015, Constants.HEIGHT * 0.03, Resource.COIN)
            .setScale(0.75);

        background.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, this.onTypePointerDown.bind(this, type));

        this.add([background, image, resourceValue, resourceImage]);
    }

    /** @param {string} type */
    onTypePointerDown(type) {
        this.emit(TowerPicker.Events.TYPE_SELECT, type);
        this.hide();
    }

    show() {
        this.scene.tweens.add({
            targets: this,
            alpha: 1,
            ease: Phaser.Math.Easing.Expo.In,
            duration: 200,
            onComplete: () => {
                this.scene.hud.backButton.setAlpha(0)
                this.scene.hud.specialsButton.setAlpha(0)

                if (this.scene.hud.specialsButtonsVisible) {
                    this.scene.hud.toggleSpecials();
                }
            }
        })
    }

    hide() {
        this.scene.tweens.add({
            targets: this,
            alpha: 0,
            ease: Phaser.Math.Easing.Expo.In,
            duration: 200,
            onComplete: () => {
                this.scene.hud.backButton.setAlpha(1)
                this.scene.hud.specialsButton.setAlpha(1)
            }
        })
    }
}