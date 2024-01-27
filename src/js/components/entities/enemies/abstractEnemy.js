import Constants from '../../../constants/constants.js';
import './typedefs/abstractEnemyConfig.js';
import '../towers/typedefs/damageInfo.js';
import GraphicsGenerator from '../../graphicsGenerator/graphicsGenerator.js';
import HealthBar from '../../healthBar/healthBar.js';

export default class AbstractEnemy extends Phaser.GameObjects.Sprite {
    static Events = {
        ENEMY_MOVED: 'enemyMoved',
        KILLED: 'killed'
    }

    /** @param {AbstractEnemyConfig} config */
    constructor(config) {
        config.texture = `${config.type}Front`;

        super(config.scene, config.x, config.y, config.texture);

        this.Directions = {
            UP: 0,
            RIGHT: 1,
            DOWN: 2,
            LEFT: 3
        };

        this.type = config.type;
        this.health = 100;
        this.direction =  this.Directions.DOWN;
        this.graphicsGenerator = new GraphicsGenerator(this.scene);

        this.Textures = {
            FRONT: `${this.type}Front`,
            BACK: `${this.type}Back`,
            SIDE: `${this.type}Side`
        }

        this.resistance = 0;
        this.armor = 0;
        this.magicResistance = 0;

        this.addAnimations()
            .addHealthBar()
            .play(this.Textures.FRONT);

        this.scene.add.existing(this);
    }

    addHealthBar() {
        this.healthBar = new HealthBar(this.scene, this);

        return this;
    }

    /** @private */
    addAnimations() {
        this.anims.create({
            key: this.Textures.FRONT,
            frames: this.anims.generateFrameNumbers(this.Textures.FRONT),
            frameRate: 3,
            repeat: -1
        });
        
        this.anims.create({
            key: this.Textures.BACK,
            frames: this.anims.generateFrameNumbers(this.Textures.BACK),
            frameRate: 3,
            repeat: -1
        });

        this.anims.create({
            key: this.Textures.SIDE,
            frames: this.anims.generateFrameNumbers(this.Textures.SIDE),
            frameRate: 3,
            repeat: -1
        });

        return this;
    }

    move(x, y) {
        if (x > this.x) {
            this.onMoveRight();
        } else if (x < this.x) {
            this.onMoveLeft();
        } else if (y > this.y) {
            this.onMoveDown();
        } else if (y < this.y) {
            this.onMoveUp();
        }

        this.scene.tweens.add({
            targets: this,
            x,
            y,
            ease: Phaser.Math.Easing.Linear,
            duration: Constants.ENEMY_MOVE_DURATION,
            onComplete: () => this.emit(AbstractEnemy.Events.ENEMY_MOVED)
        });

        return this;
    }

    /** @private */
    onMoveRight() {
        if (this.direction === this.Directions.RIGHT) {
            return;
        }

        this.setFlipX(false)
            .play(this.Textures.SIDE);

        this.direction = this.Directions.RIGHT;
    }

    /** @private */
    onMoveLeft() {
        if (this.direction === this.Directions.LEFT) {
            return;
        }

        this.setFlipX(true)
            .play(this.Textures.SIDE);

        this.direction = this.Directions.LEFT;
    }

    /** @private */
    onMoveDown() {
        if (this.direction === this.Directions.DOWN) {
            return;
        }

        this.setFlipX(false)
            .play(this.Textures.FRONT);

        this.direction = this.Directions.DOWN;
    }

    /** @private */
    onMoveUp() {
        if (this.direction === this.Directions.UP) {
            return;
        }

        this.setFlipX(false)
            .play(this.Textures.BACK);

        this.direction = this.Directions.UP;
    }

    /** @param {DamageInfo} damageInfo */
    calculateDamage(damageInfo) {
        this.health -= damageInfo.physical * (1 - this.resistance) + damageInfo.explosive * (1 - this.armor) + damageInfo.magic * (1 - this.magicResistance);

        this.healthBar.updateHealthBar(this.health);

        if (this.health <= 0) {
            this.emit(AbstractEnemy.Events.KILLED);
            this.destroy();
            
            if (this.healthBar && this.healthBar.active) {
                this.healthBar.destroy();
            }
        }
    }
}
