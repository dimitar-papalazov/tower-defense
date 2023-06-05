import fontStyle from '../../enum/fontStyle';
import Button from './Button';

export default class ToggleButton extends Button {
  /**
   * Create custom toggle button
   * @param {object} config ToggleButtonConfig
   * @param {Phaser.Scene} config.scene
   * @param {number} config.x
   * @param {number} config.y
   * @param {function} config.callback
   * @param {object} config.context
   * @param {string} config.text
   * @param {string} config.size
   * @param {number} config.enableColor
   * @param {number} config.disableColor
   * @param {boolean} config.enabled
   */
  constructor (config) {
    super(config.scene, config.x, config.y, config.callback, config.context);
    this.enabled = config.enabled;
    this.key = `${config.text}-toggle-button`;
    this.addText(config.text, config.size);
    this.addBackground(config.enableColor, config.disableColor);
  }

  addText (text, size) {
    const style = fontStyle.BUTTON;
    style.fontSize = size;
    this.text = this.scene.add.text(this.positionX, this.positionY, text, style)
      .setOrigin(0.5);
    this.updateSize();
    this.add(this.text);
  }

  updateSize () {
    const space = Math.round(this.text.height / 1.75);
    this.height = space * 3;
    this.width = this.text.width + space * 2;
    super.updateSize();
  }

  addBackground (enable, disable) {
    this.createTextures(enable, disable);
    const texture = `${this.key}-${this.enabled ? 'enabled' : 'disabled'}`;
    this.background = this.scene.add.image(this.positionX, this.positionY, texture);
    this.addAt(this.background, 0);
  }

  createTextures (enable, disable) {
    const graphics = this.scene.add.graphics();

    if (!this.scene.textures.exists(`${this.key}-enabled`)) {
      graphics.fillStyle(enable);
      graphics.fillRoundedRect(0, 0, this.width, this.height);
      graphics.generateTexture(`${this.key}-enabled`, this.width, this.height);
      graphics.clear();
    }

    if (!this.scene.textures.exists(`${this.key}-disabled`)) {
      graphics.fillStyle(disable);
      graphics.fillRoundedRect(0, 0, this.width, this.height);
      graphics.generateTexture(`${this.key}-disabled`, this.width, this.height);
      graphics.clear();
    }

    graphics.destroy();
  }

  setTexture (value) {
    if (value) {
      this.background.setTexture(`${this.key}-enabled`);
    } else {
      this.background.setTexture(`${this.key}-disabled`);
    }
  }

  onPointerDown () {
    this.pointerDown = true;
  }

  onPointerUp () {
    this.pointerDown = false;

    if (this.enabled) {
      this.enabled = false;
    } else {
      this.enabled = true;
    }

    this.setTexture(this.enabled);
    super.onPointerUp();
  }

  onPointerOut () {
    this.pointerDown = false;
  }
}
