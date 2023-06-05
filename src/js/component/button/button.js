import Phaser from 'phaser';

export default class Button extends Phaser.GameObjects.Container {
  /**
   * @param {Phaser.Scene} scene
   * @param {Number} x
   * @param {Number} y
   * @param {Function} callback
   * @param {Object} context
   * @param {Object[]} params
   */
  constructor (scene, x, y, callback, context, params) {
    super(scene);
    this.positionX = x;
    this.positionY = y;
    this.width = 0;
    this.height = 0;
    this.callback = callback;
    this.context = context;
    this.params = params;
    this.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.width, this.height), Phaser.Geom.Rectangle.Contains);
    this.on(Phaser.Input.Events.POINTER_DOWN, this.onPointerDown, this);
    this.on(Phaser.Input.Events.POINTER_UP, this.onPointerUp, this);
    this.scene.add.existing(this);
  }

  onPointerDown () {
    // animation goes here
  }

  onPointerUp () {
    this.callback.apply(this.context, this.params);
  }

  updateSize () {
    this.removeInteractive();
    this.setInteractive(new Phaser.Geom.Rectangle(this.positionX, this.positionY, this.width, this.height), Phaser.Geom.Rectangle.Contains);
  }

  setVisible (value) {
    if (value && !this.input.enabled) {
      this.setInteractive();
    } else if (!value && this.input.enabled) {
      this.disableInteractive();
    }

    super.setVisible(value);
  }
}
