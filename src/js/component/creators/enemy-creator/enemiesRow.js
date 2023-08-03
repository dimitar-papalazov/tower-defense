import Phaser from 'phaser';
import color from '../../../enum/color';
import enemy from '../../../enum/enemy';
import fontStyle from '../../../enum/fontStyle';
import TextButton from '../../button/textButton';

export default class EnemiesRow extends Phaser.GameObjects.Container {
  /**
   * Creates EnemiesRow instance
   * @param {object} config EnemiesRowConfig
   * @param {Phaser.Scene} config.scene scene instance where this is created
   * @param {number} config.x horizontal position
   * @param {number} config.y vertical position
   * @param {number[]} config.enemies enemy numbers
   */
  constructor (config) {
    super(config.scene, config.x, config.y);
    this.enemies = config.enemies;
    this.height = 125;
    this.width = 900;
    this.enemyRowBackgroundKey = 'enemyRowBackground';
    this.createBackground();
    this.createEnemies();
    this.createDeleteButton();
  }

  createBackground () {
    this.createBackgroundTexture();
    this.background = this.scene.add.image(0, 0, this.enemyRowBackgroundKey);
    this.add(this.background);
  }

  createBackgroundTexture () {
    if (this.scene.textures.exists(this.enemyRowBackgroundKey)) return;

    const graphics = this.scene.add.graphics();
    graphics.fillStyle(color.WHITE.NUMBER);
    graphics.fillRoundedRect(0, 0, this.width, this.height);
    graphics.generateTexture(this.enemyRowBackgroundKey, this.width, this.height);
    graphics.destroy();
  }

  createEnemies () {
    const betweenSpace = this.width * 0.225;
    const startFrom = -this.width * 0.425;
    const textSpace = this.width * 0.1;

    const creep = this.scene.add.image(startFrom, 0, enemy.CREEP.TEXTURE);

    const creepText = this.scene.add.text(
      startFrom + textSpace,
      0,
      `${this.enemies[0]}`,
      fontStyle.ROW
    ).setOrigin(0.5);

    const armoredCreep = this.scene.add.image(
      startFrom + betweenSpace,
      0,
      enemy.ARMORED_CREEP.TEXTURE
    );

    const armoredText = this.scene.add.text(
      startFrom + betweenSpace + textSpace,
      0,
      `${this.enemies[1]}`,
      fontStyle.ROW
    ).setOrigin(0.5);

    const absorberCreep = this.scene.add.image(
      startFrom + 2 * betweenSpace,
      0,
      enemy.ABSORBER_CREEP.TEXTURE
    );

    const absorberText = this.scene.add.text(
      startFrom + 2 * betweenSpace + textSpace,
      0,
      `${this.enemies[2]}`,
      fontStyle.ROW
    ).setOrigin(0.5);

    this.add([
      creep,
      creepText,
      armoredCreep,
      armoredText,
      absorberCreep,
      absorberText
    ]);
  }

  createDeleteButton () {
    this.deleteButton = new TextButton({
      scene: this.scene,
      x: this.width * 0.4,
      y: 0,
      callback: () => { },
      context: this,
      text: 'Delete',
      size: '24px',
      color: color.PRIMARY.NUMBER
    });

    this.add(this.deleteButton);
  }
}
