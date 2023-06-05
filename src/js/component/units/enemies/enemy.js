import Phaser from 'phaser';
import enemyEnum from '../../../enum/enemy.js';
import TowerDefenseScene from '../../../scene/towerDefenseScene.js';

export default class Enemy extends Phaser.GameObjects.Sprite {
  static TYPE = enemyEnum.ENEMY.TYPE;
  static COLOR = enemyEnum.ENEMY.COLOR;
  static TEXTURE = enemyEnum.ENEMY.TEXTURE;

  /**
   * @param {TowerDefenseScene} scene
   * @param {number} x
   * @param {number} y
   */
  constructor (scene, x, y) {
    super(scene, x, y, enemyEnum.ENEMY.TEXTURE);
    /**
     * @type {TowerDefenseScene}
     */
    this.scene;
    this.emitter = this.scene.game.emitter;
    this.type = Enemy.TYPE;
    this.color = Enemy.COLOR;
    this.health = 400;
    this.id = -1;
    this.dead = false;
    this.generateTexture();
    this.scene.add.existing(this);
  }

  generateTexture () {
    if (this.scene.textures.exists(Enemy.TEXTURE)) return;
    const graphics = this.scene.add.graphics();
    graphics.fillStyle(this.color);
    graphics.fillRoundedRect(0, 0, 100, 100);
    graphics.generateTexture(Enemy.TEXTURE, 100, 100);
    graphics.clear();
    graphics.destroy();
    this.setTexture(Enemy.TEXTURE);
    this.setTint(this.color);
  }
}
