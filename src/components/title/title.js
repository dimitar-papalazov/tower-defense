import { TowerDefenseScene } from '../../scenes/towerDefenseScene.js';

export class Title extends Phaser.GameObjects.BitmapText {
  static SIZE = {
    SMALL: 102,
    NORMAL: 128,
    BIG: 154,
  };

  /**
   * @param {TowerDefenseScene} scene The Scene to which this Game Object belongs. It can only belong to one Scene at any given time.
   * @param {number} x The x coordinate of this Game Object in world space.
   * @param {number} y The y coordinate of this Game Object in world space.
   * @param {string} text The string, or array of strings, to be set as the content of this Bitmap Text.
   * @param {Title.SIZE.SMALL | Title.SIZE.NORMAL | Title.SIZE.BIG} size The font size of this Bitmap Text.
   */
  constructor (scene, x, y, text, size = Title.SIZE.NORMAL) {
    super(scene, x, y, 'main', text, size, 1);
    /**
     * A reference to the Scene to which this Game Object belongs.
     * 
     * Game Objects can only belong to one Scene.
     * 
     * You should consider this property as being read-only. You cannot move a
     * Game Object to another Scene by simply changing it.
     * 
     * @type {TowerDefenseScene}  Type declared for IntelliSense purpose only.
     */
    this.scene;

    this.setOrigin(0.5);
    this.scene.add.existing(this);
  }
}