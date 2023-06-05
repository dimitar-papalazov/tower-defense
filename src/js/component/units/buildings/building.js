import Phaser from 'phaser';
import color from '../../../enum/color';
import events from '../../../enum/events';
import TowerDefenseScene from '../../../scene/towerDefenseScene';
import Enemy from '../enemies/enemy';

export default class Building extends Phaser.GameObjects.Sprite {
  static TYPE = 'Building';
  static TEXTURE = 'building';
  static FIRE_TEXTURE = 'fireTexture';
  static RANGE = 200;

  /**
   * 
   * @param {TowerDefenseScene} scene 
   * @param {number} x 
   * @param {number} y 
   */
  constructor (scene, x, y) {
    super(scene, x, y, Building.TEXTURE);
    /**
     * @type {TowerDefenseScene}
     */
    this.scene;
    this.generateTexture();
    this.startingX = this.x;
    this.startingY = this.y;
    this.type = Building.TYPE;
    this.color = color.WHITE.NUMBER;
    this.generateFireTexture();
    this.placed = false;
    this.moving = false;
    this.clicks = 0;
    this.isFiring = false;
    this.emitter = this.scene.game.emitter;
    this.enableInput();
    this.scene.add.existing(this);
  }

  generateTexture () {
    if (this.scene.textures.exists(Building.TEXTURE)) return;
    const graphics = this.scene.add.graphics();
    graphics.fillStyle(color.WHITE.NUMBER);
    graphics.fillTriangle(0, 80, 80, 80, 40, 0);
    graphics.generateTexture(Building.TEXTURE, 80, 80);
    graphics.destroy();
    this.setTexture(Building.TEXTURE);
  }

  enableInput () {
    this.setInteractive();
    this.on(Phaser.Input.Events.POINTER_DOWN, this.onPointerDown, this);
    this.scene.input.on(Phaser.Input.Events.POINTER_MOVE, this.onPointerMove, this);
  }

  onPointerDown (pointer) {
    this.clicks++;

    if (!this.placed && this.clicks === 1) {
      this.moving = true;
      this.setX(pointer.x);
      this.setY(pointer.y);
      this.emitter.emit(events.BUILDING_START_MOVING);
      this.emitter.emit(events.HIDE_TOWER_PICKER);
    }

    if (this.moving && this.clicks === 2) {
      this.setX(this.startingX);
      this.setY(this.startingY);
      this.moving = false;
      this.emitter.emit(events.BUILDING_PLACED, Math.round(pointer.x), Math.round(pointer.y), this.type);
      this.clicks = 0;
      this.emitter.emit(events.SHOW_TOWER_PICKER);
    }
  }

  onPointerMove (pointer) {
    if (!this.moving) return;
    this.setX(pointer.x);
    this.setY(pointer.y);
  }

  generateFireTexture () {
    if (this.scene.textures.exists(Building.FIRE_TEXTURE)) return;
    const graphics = this.scene.add.graphics();
    graphics.fillStyle(color.WHITE.NUMBER);
    graphics.fillCircle(10, 10, 10);
    graphics.generateTexture(Building.FIRE_TEXTURE, 20, 20);
    graphics.destroy();
  }
}
