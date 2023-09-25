import { ColorEnum } from '../../colors/color.enum';
import { TextStyleEnum } from '../../textStyles/textStyle.enum';

export class TextButton extends Phaser.GameObjects.RenderTexture {
  /**
   * @param {import("./typedefs/typedefs").TextButtonConfig} config
   */
  constructor(config) {
    super(config.scene, config.x, config.y);

    this.callback = config.callback;
    this.context = config.context;
    this.params = config.params;

    this.addText(config.text)
      .drawBackground()
      .drawText()
      .setInteractive()
      .on(Phaser.Input.Events.POINTER_DOWN, this.onPointerDown, this)
      .on(Phaser.Input.Events.POINTER_UP, this.onPointerUp, this)
      .on(Phaser.Input.Events.POINTER_OUT, this.onPointerOut, this);

    this.scene.add.existing(this);
  }

  drawBackground() {
    const percent = this.width * 0.01;

    const graphics = this.scene.add
      .graphics()
      .fillStyle(ColorEnum.Light.Number)
      .fillRect(0, 0, this.width, this.height)
      .fillStyle(ColorEnum.Dark.Number)
      .fillRect(percent, percent, this.width, this.height)
      .fillStyle(ColorEnum.Primary.Number)
      .fillRect(percent * 3, percent * 3, this.width, this.height);

    this.draw(graphics);

    graphics.destroy();

    return this;
  }

  /**
   * @param {string} text
   */
  addText(text) {
    this.text = this.scene.add
      .text(0, 0, text, TextStyleEnum.BigText)
      .setOrigin(0.5);

    return this.setSize(this.text.width * 1.618, this.text.height * 1.618);
  }

  drawText() {
    this.draw(this.text, this.width * 0.5, this.height * 0.5);

    this.text.destroy();
    this.text = undefined;

    return this;
  }

  onPointerDown() {
    this.isDown = true;

    this.scene.tweens.add({
      targets: this,
      scale: 0.95,
      ease: Phaser.Math.Easing.Quadratic.In,
      duration: 100,
    });
  }

  onPointerUp() {
    if (!this.isDown) return;

    this.scene.tweens.add({
      targets: this,
      scale: 1,
      ease: Phaser.Math.Easing.Quadratic.Out,
      duration: 100,
      onComplete: this.callback,
      callbackScope: this.context,
      onCompleteParams: this.params,
    });

    this.isDown = false;
  }

  onPointerOut() {
    this.scene.tweens.add({
      targets: this,
      scale: 1,
      ease: Phaser.Math.Easing.Quadratic.Out,
      duration: 100,
    });

    this.isDown = false;
  }
}
