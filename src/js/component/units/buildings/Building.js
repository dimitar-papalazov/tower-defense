import Phaser from 'phaser';
import color from '../../../enum/color';
import events from '../../../enum/events';

export default class Building extends Phaser.GameObjects.Sprite {
  static TYPE = 'Building';
  static TEXTURE = 'building';

  constructor (scene, x, y) {
    super(scene, x, y, Building.TEXTURE);
    this.generateTexture();
    this.startingX = this.x;
    this.startingY = this.y;
    this.type = Building.TYPE;
    this.range = 200;
    this.fireTexture = 'fireTexture';
    this.color = color.WHITE.NUMBER;
    this.generateFireTexture();
    this.placed = false;
    this.moving = false;
    this.clicks = 0;
    this.fireStarted = false;
    this.emitter = this.scene.game.emitter;
    this.enableInput();
    this.setupEvents();
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

  setupEvents () {
    this.emitter.on(events.ENEMY_MOVED, this.fireAnimation, this);
    this.emitter.on(events.BUILDING_START_MOVING, this.onBuildingStartMoving, this);
    this.emitter.on(events.BUILDING_PLACED, this.onBuildingPlaced, this);
  }

  onBuildingStartMoving () {
    if (this.placed) return;
    if (!this.moving) this.setVisible(false);
  }

  onBuildingPlaced (x, y, type) {
    if (!this.moving) this.setVisible(true);

    if (this.placed) {
      if (Phaser.Geom.Intersects.TriangleToTriangle(
        new Phaser.Geom.Triangle(this.x - 40, this.y + 40, this.x + 40, this.y + 40, this.x, this.y - 40),
        new Phaser.Geom.Triangle(x - 40, y + 40, x + 40, y + 40, x, y - 40))) this.emitter.emit(events.BUILDING_CANCELED, x, y, type);
      else this.emitter.emit(events.CAN_BE_BUILT, x, y, type);
    }
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

  toString () {
    return JSON.stringify({
      type: this.type,
      damage: this.damage,
      penetration: this.penetration,
      magic: this.magic
    });
  }

  fireAnimation (gameObject) {
    if (!this.placed) return;
    if (Phaser.Math.Distance.Between(this.x, this.y, gameObject.x, gameObject.y) > this.range) return;
    if (this.fireStarted) return;
    this.fireStarted = true;
    const fire = this.scene.add.image(this.x, this.y - this.height * 0.5, this.fireTexture);
    fire.setTint(this.color);

    this.scene.tweens.add({
      targets: [fire],
      duration: 100,
      ease: Phaser.Math.Easing.Linear,
      x: gameObject.x,
      y: gameObject.y,
      onComplete: () => {
        this.fireStarted = false;
        this.emitter.emit(events.ENEMY_ATTACKED, gameObject.id, this.type);
        fire.destroy();
      }
    });
  }

  generateFireTexture () {
    if (this.scene.textures.exists(this.fireTexture)) return;
    const graphics = this.scene.add.graphics();
    graphics.fillStyle(color.WHITE.NUMBER);
    graphics.fillCircle(10, 10, 10);
    graphics.generateTexture(this.fireTexture, 20, 20);
    graphics.destroy();
  }

  destroy () {
    this.emitter.off(events.ENEMY_MOVED, this.fireAnimation, this);
    this.emitter.off(events.BUILDING_START_MOVING, this.onBuildingStartMoving, this);
    this.emitter.off(events.BUILDING_PLACED, this.onBuildingPlaced, this);
    super.destroy();
  }
}
