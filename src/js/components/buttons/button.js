import Color from '../../namespaces/color.js';
import GraphicsGenerator from '../graphicsGenerator/graphicsGenerator.js';
import './typedefs/buttonConfig.js'

export default class Button extends Phaser.GameObjects.Container {
  /** @param {ButtonConfig} config */
  constructor(config) {
    super(config.scene, config.x, config.y);

    this.width = config.width ?? 0;
    this.height = config.height ?? 0;
    this.callback = config.callback ?? Phaser.Utils.NOOP;
    this.context = config.context;
    this.params = config.params;
    this.clicked = false;
    this.tweenTargets = [];
    this.graphicsGenerator = new GraphicsGenerator(this.scene);

    this.scene.add.existing(this);
  }

  onPointerDown() {
    this.clicked = true;

    this.scene.add.tween({
      targets: this.tweenTargets,
      scale: 0.95,
      ease: Phaser.Math.Easing.Expo.In,
      duration: 100,
    });
  }

  onPointerUp() {
    if (!this.clicked) {
      return;
    }

    this.scene.sound.playTap();

    this.scene.add.tween({
      targets: this.tweenTargets,
      scale: 1,
      ease: Phaser.Math.Easing.Expo.In,
      duration: 100,
      onComplete: this.onPointerUpComplete,
      callbackScope: this
    });
  }

  onPointerUpComplete() {
    this.callback.apply(this.context, this.params)
  }

  onPointerOut() {
    this.clicked = false;

    this.scene.add.tween({
      targets: this.tweenTargets,
      scale: 1,
      ease: Phaser.Math.Easing.Expo.In,
      duration: 100
    });
  }

  /** @param {boolean} value */
  setVisible(value) {
    if (value && !this.input.enabled) {
      this.setInteractive();
    } else if (!value && this.input.enabled) {
      this.disableInteractive();
    }

    return super.setVisible(value);
  }

  /** 
   * @param {number} color
   */
  generateKey(color) {
    this.key = `button-${color}-${this.width}-${this.height}`;

    return this;
  }

  /** @param {number} color */
  generateTexture(color) {
    if (this.scene.textures.exists(this.key)) {
      return this;
    }

    this.graphicsGenerator.generate({
      color,
      height: this.height,
      key: this.key,
      width: this.width
    });

    return this;
  }

  addBackground() {
    this.background = this.scene.add.image(0, 0, this.key);

    return this.addAt(this.background, 0);
  }

  /**
   * @param {ButtonConfig} config
   */
  setupDefaults(config) {
    config.color = Color.Number.BEIGE;

    return this;
  }

  resetInteractivity() {
    return this.removeInteractive()
      .setInteractive(new Phaser.Geom.Rectangle(0, 0, this.width, this.height), Phaser.Geom.Rectangle.Contains)
  }

  setInteractivity() {
    return this.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.width, this.height), Phaser.Geom.Rectangle.Contains)
      .on(Phaser.Input.Events.POINTER_DOWN, this.onPointerDown)
      .on(Phaser.Input.Events.POINTER_UP, this.onPointerUp)
      .on(Phaser.Input.Events.POINTER_OUT, this.onPointerOut);
  }
}