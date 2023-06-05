import Phaser from 'phaser';
import LevelButton from '../button/levelButton.js';

export default class Slider extends Phaser.GameObjects.Container {
  /**
   * Creates a Slider GameObject, that extends Phaser.GameObjects.Container.
   * It can be populated with other Containers.
   * This GameObject is draggable and utilizes this function.
   * @param {SliderConfig} config 
   */
  constructor (config) {
    super(config.scene);
    this.positionX = config.x;
    this.positionY = config.y;
    this.width = config.width;
    this.height = config.height;
    this.spaceBetween = config.spaceBetween;
    this.nextItemPosition = this.positionY;
    this.addMask();
    this.on(Phaser.Input.Events.GAMEOBJECT_DRAG, this.onDrag, this);
    this.scene.add.existing(this);
  }

  /**
   * Creates a mask for this GameObject, so when sliding, some of the items of this GameObject disappear.
   */
  addMask () {
    const key = 'slider-mask';
    if (this.scene.textures.exists(key)) this.scene.textures.remove(key);
    const graphics = this.scene.make.graphics({});
    graphics.fillStyle(0xffffff);
    graphics.fillRect(0, 0, this.width, this.height);
    graphics.generateTexture(key, this.width, this.height);
    graphics.destroy();
    if (this.imageMask && this.imageMask.active) this.imageMask.destroy();
    this.imageMask = this.scene.add
      .image(this.positionX, this.positionY, key)
      .setOrigin(0)
      .setVisible(false);
    this.setMask(this.imageMask.createBitmapMask());
  }

  /**
   * Adds the dragging input on this GameObject.
   */
  addInput () {
    const x = this.positionX + this.width / 2;
    const y = this.positionY + this.height / 2;
    this.setInteractive(new Phaser.Geom.Rectangle(x, y, this.width, this.height), Phaser.Geom.Rectangle.Contains);
    this.scene.input.setDraggable(this);
    this.dragMax = 0;
    this.dragMin = this.scene.game.scale.height - (this.positionY + this.height);
  }

  /**
   * Changes the position of this Slider, when dragging, and checking for the boundaries provided.
   * @param {Phaser.Input.Pointer} pointer The Pointer responsible for triggering this event.
   * @param {Number} dragX The x coordinate where the Pointer is currently dragging the Game Object, in world space.
   * @param {Number} dragY The y coordinate where the Pointer is currently dragging the Game Object, in world space.
   */
  onDrag (pointer, dragX, dragY) {
    if (dragY < this.dragMin) this.y = this.dragMin;
    else if (dragY > this.dragMax) this.y = this.dragMax;
    else this.y = dragY;
  }

  /**
   * Adds the items to this Slider & updates its size.
   * @param {LevelButton[]} items
   */
  addItems (items) {
    items.forEach(i => { this.addItem(i); });
    this.updateSize();
  }

  /**
   * Adds a Container to this Slider. Changes the item's position so it is added to the bottom of this Slider.
   * @param {LevelButton} item
   */
  addItem (item) {
    if (!item) throw new Error('Item not provided!');
    if (isNaN(item.height)) throw new Error('Provided item has no height property!');
    if (isNaN(item.x)) throw new Error('Provided item has no x property!');
    if (isNaN(item.y)) throw new Error('Provided item has no y property!');
    this.add(item);
    item.x = this.positionX + this.width / 2;
    this.nextItemPosition += item.height / 2;
    item.y = this.nextItemPosition;
    this.nextItemPosition += this.spaceBetween;
  }

  /**
   * Updates the size of this Slider. Also updates its input & mask.
   */
  updateSize () {
    if (this.nextItemPosition - this.spaceBetween * 2 < this.height) return;
    this.height = this.nextItemPosition - this.spaceBetween * 2;
    this.addInput();
    this.addMask();
  }
}
