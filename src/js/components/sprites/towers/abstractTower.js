import Constants from '../../../constants/constants.js';
import './typedefs/abstractTowerConfig.js';

export default class AbstractTower extends Phaser.GameObjects.Container {
    /** @param {AbstractTowerConfig} config */
    constructor(config) {
        super(config.scene, config.x, config.y);

        this.addImage(config)
            .addFireRadius();

        this.scene.add.existing(this);
    }

    addImage(config) {
        this.image = this.scene.add
            .image(0, 0, config.type)
            .setOrigin(0.5, 0.75);

        return this.add(this.image);
    }

    addFireRadius() {
        this.fireRadius = new Phaser.Geom.Circle(this.x, this.y, Constants.TILE_SIZE * 3);
    }

    /** @param {import('../enemies/abstractEnemy.js').default} enemy */
    fireAnimation(enemy) {
        if (this.enemy) {
            return;
        }
        
        this.enemy = enemy;
        this.fire = this.scene.add.image(this.x, this.y, 'flame');
        this.scene.children.moveBelow(this.fire, this);

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
    
    /** @param {import('../enemies/abstractEnemy.js').default} enemy */
    isInRange(enemy) {
        return Phaser.Geom.Circle.ContainsRect(this.fireRadius, enemy.getBounds())
    } 

    /** @param {Phaser.Tweens.Tween} tween */
    onFireAnimationUpdate(tween) {
        const value = tween.getValue();
        const line = new Phaser.Geom.Line(this.x, this.y, this.enemy.x, this.enemy.y);
        const point = Phaser.Geom.Line.GetPoint(line, value);

        this.fire.setPosition(point.x, point.y);
    }

    onFireAnimationComplete() {
        this.fire.destroy();
        this.enemy = undefined;
    }
}