import Color from '../../namespaces/color.js';
import TextStyle from '../../namespaces/textStyle.js';
import Button from './button.js';
import './typedefs/buttonConfig.js'

export default class ToggleButton extends Button {
  /** @param {ToggleButtonConfig} config */
  constructor(config) {
    super(config);

    this.toggled = config.toggle ?? true;

    this.setupDefaults(config)
      .generateKey(config.text, config.color)
      .generateTexture(config.color)
      .addBackground()
      .addText(config.text, config.textStyle)
      .addImage(config.texture)
      .setTint()
      .setInteractivity();

    this.tweenTargets = [this.background, this.image, this.text];
  }

  /** @param {string} text */
  addImage(texture) {
    this.image = this.scene.add.image(0, this.height * -0.2, texture)

    return this.add(this.image);
  }

  /**
   * @override
   * @param {TextButtonConfig} config
   */
  setupDefaults(config) {
    config.textStyle = TextStyle.ButtonSmall;
    config.color = Color.Number.BEIGE;

    if (typeof config.textStyle.fontSize === 'string') {
      config.textStyle.fontSize = parseInt(config.textStyle.fontSize.replace('px', ''));
    }

    return this;
  }

  /**
   * @param {string} text
   * @param {Phaser.Types.GameObjects.Text.TextStyle} textStyle
   */
  addText(text, textStyle) {
    this.text = this.scene.add.text(0, this.height * 0.25, text, textStyle)
      .setOrigin(0.5);

    return this.add(this.text);
  }

  /** 
   * @override
   * @param {string} text 
   * @param {number} color
   */
  generateKey(text, color) {
    this.key = `toggle-button-${text.split(' ').join('-').toLowerCase()}-${color}-${this.width}-${this.height}`;

    return this;
  }

  /** @override */
  onPointerUpComplete() {
    if (!this.clicked) {
      return;
    }

    this.toggled = !this.toggled;

    this.setTint();

    this.callback.apply(this.context, this.params)
  }

  setTint() {
    const tint = this.toggled ? 0xffffff : 0x808080;

    for (const target of this.tweenTargets) {
      target.setTint(tint);
    }

    return this;
  }
}