import Color from "../../namespaces/color.js";
import GraphicsGenerator from "../graphicsGenerator/graphicsGenerator.js";

export default class HealthBar extends Phaser.GameObjects.Container {
    /** 
     * @param {import('../../scenes/level.js').default} scene 
     * @param {import('../../components/entities/enemies/abstractEnemy.js').default} enemy 
     */
    constructor(scene, enemy) {
        super(scene);

        this.enemy = enemy;
        this.borderKey = 'health-bar-border';
        this.fillKey = 'health-bar-fill';
        this.height = 10;
        this.width = 30;

        this.generateGraphics()
            .addBorder()
            .setAlpha(0);

        this.scene.add.existing(this);
    }

    generateGraphics() {
        const graphicsGenerator = new GraphicsGenerator(this.scene);

        graphicsGenerator.generate({
            color: Color.Number.YELLOW,
            height: this.height * 0.5,
            key: this.borderKey,
            width: this.width,
            hasBorder: false
        });

        graphicsGenerator.generate({
            color: Color.Number.WHITE,
            height: this.height * 0.45,
            key: this.fillKey,
            width: this.width * 0.9,
            hasBorder: false
        });

        return this;
    }

    addBorder() {
        this.border = this.scene.add.image(0, 0, this.borderKey);

        return this.add(this.border);
    }

    /**
     * @param {number} health
     * @param {number} x
     * @param {number} y 
     */
    updateHealthBar(health, x, y) {
        this.setPosition(x, y);

        if (!this.fill) {
            this.fill = this.scene.add.image(0, 0, this.fillKey);

            this.add(this.fill);
        }

        if (health > 67) {
            this.fill.setTint(Color.Number.GREEN);
        } else if (health > 33) {
            this.fill.setTint(Color.Number.ORANGE);
        } else {
            this.fill.setTint(Color.Number.RED);
        }

        this.fill.setCrop(0, 0, health / 100 * this.width, this.height);

        this.show();
    }

    show() {
        if (!this.active) {
            return;
        }

        if (this.showTween && this.showTween.isPlaying()) {
            this.showTween.stop();

            this.showTween = null;
        }

        if (this.hideTween && this.hideTween.isPlaying()) {
            this.hideTween.stop();

            this.hideTween = null;
        }

        this.showTween = this.scene.tweens.add({
            targets: this,
            alpha: 1,
            ease: Phaser.Math.Easing.Expo.In,
            duration: 200,
            onUpdate: this.onTweenUpdate,
            onComplete: this.hide,
            callbackScope: this
        });
    }

    hide() {
        if (!this.active) {
            return;
        }

        this.hideTween = this.scene.tweens.add({
            targets: this,
            alpha: 0,
            ease: Phaser.Math.Easing.Expo.In,
            duration: 1800,
            onUpdate: this.onTweenUpdate,
            callbackScope: this
        });
    }

    onTweenUpdate() {
        this.setPosition(this.enemy.x, this.enemy.y - this.enemy.height);
    }
}