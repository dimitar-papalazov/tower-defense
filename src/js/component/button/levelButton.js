import fontStyle from '../../enum/fontStyle';
import TextButton from './textButton';

let globalSuccess = null;
let globalText = null;

export default class LevelButton extends TextButton {
  /**
   * Create custom text button
   * @param {Object} config TextButtonConfig
   * @param {Phaser.Scene} config.scene
   * @param {Number} config.x
   * @param {Number} config.y
   * @param {Function} config.callback
   * @param {Object} config.context
   * @param {Object[]} config.params
   * @param {String} config.text
   * @param {String} config.size
   * @param {Number} config.color
   * @param {Number} config.success
   */
  constructor (config) {
    globalSuccess = config.success;
    globalText = config.text;
    super(config);
  }

  addText (text, size) {
    const style = fontStyle.BUTTON;
    style.fontSize = size;
    text += globalSuccess <= 0 ? '' : ` ${globalSuccess}/3`;
    this.text = this.scene.add.text(this.positionX, this.positionY, text, style)
      .setOrigin(0.5);
    this.updateSize();
    this.add(this.text);
    globalText = null;
    globalSuccess = null;
  }

  addBackground (color) {
    this.key = `${globalText}-${globalSuccess}-level-button`;

    if (!this.scene.textures.exists(this.key)) {
      const graphics = this.scene.add.graphics();
      graphics.fillStyle(color);
      graphics.fillRoundedRect(0, 0, this.width, this.height);
      graphics.generateTexture(this.key, this.width, this.height);
      graphics.destroy();
    }

    const image = this.scene.add.image(this.positionX, this.positionY, this.key);
    this.addAt(image, 0);
  }
}
