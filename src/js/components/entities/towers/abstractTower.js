import Constants from '../../../constants/constants.js';
import './typedefs/abstractTowerConfig.js';

export default class AbstractTower extends Phaser.GameObjects.Container {
    /** @param {AbstractTowerConfig} config */
    constructor(config) {
        super(config.scene, config.x, config.y);

        this.type = config.type;

        this.addImage()
            .addFireRadius()
            .setDepth(Constants.TOWER_DEPTH);

        this.damage = {
            physical: 0,
            explosive: 0,
            magic: 0,
        };

        this.scene.add.existing(this);
    }

    addImage() {
        this.image = this.scene.add
            .image(0, 0, this.type)
            .setOrigin(0.5, 0.75);

        return this.add(this.image);
    }

    addFireRadius() {
        this.fireRadius = new Phaser.Geom.Circle(this.x, this.y, Constants.TILE_SIZE * 3);

        return this;
    }

    /** @param {import('../enemies/abstractEnemy.js').default} enemy */
    fire(enemy) {
        if (this.enemy) {
            return;
        }

        this.enemy = enemy;
        this.ammunition = this.scene.add.image(this.x, this.y, 'ammunition')
            .setDepth(Constants.AMMUNITION_DEPTH);

        this.setAmmunitionTint();

        this.scene.children.moveBelow(this.ammunition, this);

        const max = Constants.MAX_FIRE_ANIMATION_DURATION;
        const min = Constants.MIN_FIRE_ANIMATION_DURATION;
        const distance = Phaser.Math.Distance.BetweenPoints(this, this.enemy);
        const percent = distance / this.fireRadius.radius;
        const duration = Phaser.Math.Clamp(max * percent, min, max);

        this.scene.tweens.addCounter({
            onUpdate: this.onFireAnimationUpdate,
            onComplete: this.onFireAnimationComplete,
            callbackScope: this,
            duration
        });
    }

    setAmmunitionTint() {
        throw new Error('Abstract method');
    }

    /** @param {import('../enemies/abstractEnemy.js').default} enemy */
    isInRange(enemy) {
        return Phaser.Geom.Circle.ContainsRect(this.fireRadius, enemy.getBounds())
    }

    /** @param {Phaser.Tweens.Tween} tween */
    onFireAnimationUpdate(tween) {
        const value = tween.getValue();
        const line = new Phaser.Geom.Line(this.x, this.y, this.enemy.x, this.enemy.y);
        const point = Phaser.Geom.Line.GetPoint(line, value);

        this.ammunition.setPosition(point.x, point.y);
    }

    onFireAnimationComplete() {
        this.enemy.calculateDamage(this.damage);

        this.ammunition.destroy();
        this.enemy = undefined;
    }
}