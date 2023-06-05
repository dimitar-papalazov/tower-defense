import color from '../../enum/color';
import events from '../../enum/events';
import Button from './button';
import Phaser from 'phaser';

export default class CancelButton extends Button {
  constructor (scene, x, y) {
    super(scene, x, y, () => { }, {});
    this.width = 60;
    this.height = 60;
    this.cancelBackgroundTexture = 'cancelBackground';
    this.xTexture = 'cancel';
    this.emitter = this.scene.game.emitter;
    this.removeInteractive();
    this.createBackground();
    this.createX();
    this.rectangle = this.scene.add.rectangle(this.positionX - 50, this.positionY - 50, 100, 100);
    this.emitter.on(events.BUILDING_PLACED, this.onBuildingPlaced, this);
    this.emitter.on(events.BUILDING_START_MOVING, () => { this.setVisible(true); });
  }

  createBackground () {
    this.generateBackground();
    this.background = this.scene.add.image(this.positionX, this.positionY, this.cancelBackgroundTexture);
    this.add(this.background);
  }

  generateBackground () {
    if (this.scene.textures.exists(this.cancelBackgroundTexture)) return;
    const graphics = this.scene.add.graphics();
    graphics.fillStyle(color.RED.NUMBER);
    graphics.fillRoundedRect(0, 0, 100, 100);
    graphics.generateTexture(this.cancelBackgroundTexture, 100, 100);
    graphics.destroy();
  }

  createX () {
    this.generateX();
    this.xImage = this.scene.add.image(this.positionX, this.positionY, this.xTexture);
    this.add(this.xImage);
  }

  generateX () {
    if (this.scene.textures.exists(this.xTexture)) return;
    const graphics = this.scene.add.graphics();
    graphics.lineStyle(8, color.WHITE.NUMBER);
    graphics.lineBetween(0, 0, 60, 60);
    graphics.lineBetween(60, 0, 0, 60);
    graphics.generateTexture(this.xTexture, 60, 60);
    graphics.destroy();
  }

  onBuildingPlaced (x, y, type) {
    if (Phaser.Geom.Rectangle.Contains(this.rectangle, x, y)) this.emitter.emit(events.BUILDING_CANCELED, x, y, type);
    else this.emitter.emit(events.CAN_BE_BUILT, x, y, type);
    this.setVisible(false);
  }

  destroy () {
    this.emitter.off(events.BUILDING_PLACED, this.onBuildingPlaced, this);
    this.emitter.off(events.BUILDING_START_MOVING, () => { this.setVisible(true); });
    super.destroy();
  }

  setVisible (value) {
    this.visible = value;
  }
}
