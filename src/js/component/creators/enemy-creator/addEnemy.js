import Phaser from 'phaser';
import color from '../../../enum/color';
import enemy from '../../../enum/enemy';
import fontStyle from '../../../enum/fontStyle';
import TextButton from '../../button/textButton';

export default class AddEnemy extends Phaser.GameObjects.Container {
  /**
   * Creates AddEnemy instance
   * @param {object} config AddEnemyConfig
   * @param {Phaser.Scene} config.scene scene instance where this is created
   * @param {number} config.x horizontal position
   * @param {number} config.y vertical position
   * @param {string} config.type type of enemy
   */
  constructor (config) {
    super(config.scene);
    this.positionX = config.x;
    this.positionY = config.y;
    this.width = 200;
    this.height = 200;
    this.type = config.type;
    this.counter = 0;
    this.createBackground();
    this.createEnemyImage();
    this.createMinus();
    this.createPlus();
    this.createCount();
    this.scene.add.existing(this);
  }

  createBackground () {
    this.createBackgroundTexture();
    this.background = this.scene.add.image(this.positionX, this.positionY, 'addEnemyBackground');
    this.add(this.background);
  }

  createBackgroundTexture () {
    if (this.scene.textures.exists('addEnemyBackground')) return;

    const graphics = this.scene.add.graphics();
    graphics.fillStyle(color.WHITE.NUMBER);
    graphics.fillRoundedRect(0, 0, this.width, this.height);
    graphics.generateTexture('addEnemyBackground', this.width, this.height);
    graphics.destroy();
  }

  createEnemyImage () {
    const texture = this.type === enemy.CREEP.TYPE ? enemy.CREEP.TEXTURE : this.type === enemy.ARMORED_CREEP.TYPE ? enemy.ARMORED_CREEP.TEXTURE : this.type === enemy.ABSORBER_CREEP.TYPE ? enemy.ABSORBER_CREEP.TEXTURE : '';
    this.enemyImage = this.scene.add.image(this.positionX, this.positionY - this.height * 0.2, texture);
    this.add(this.enemyImage);
  }

  createMinus () {
    this.minus = new TextButton({
      scene: this.scene,
      x: this.positionX - this.width * 0.3,
      y: this.positionY + this.height * 0.3,
      callback: () => {
        if (this.counter - 1 < 0) return;
        this.counter -= 1;
        this.count.setText(this.counter);
      },
      context: this,
      text: '-',
      size: '24px',
      color: color.PRIMARY.NUMBER
    });

    this.add(this.minus);
  }

  createPlus () {
    this.plus = new TextButton({
      scene: this.scene,
      x: this.positionX + this.width * 0.3,
      y: this.positionY + this.height * 0.3,
      callback: () => {
        if (this.counter + 1 > 100) return;

        this.counter += 1;
        this.count.setText(this.counter);
      },
      context: this,
      text: '+',
      size: '24px',
      color: color.PRIMARY.NUMBER
    });

    this.add(this.plus);
  }

  createCount () {
    /**
     * @type {Phaser.GameObjects.Text}
     */
    this.count = this.scene.add.text(this.positionX, this.positionY + this.height * 0.3, this.counter, fontStyle.COUNT).setOrigin(0.5);
    this.add(this.count);
  }

  reset () {
    this.counter = 0;
    this.count.setText(this.counter);
  }
}
