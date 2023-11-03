import Color from '../../enum/color.js';
import TextStyle from '../../enum/textStyle.js';
import './typedefs/types.js'

export default class TextButton extends Phaser.GameObjects.Container {
    /** @param {TextButtonConfig} config */
    constructor (config) {
      super(config.scene, config.x, config.y);

      /** @type {Function} */
      this.callback = config.callback;
      /** @type {object} */
      this.context = config.context;
      /** @type {any[]} */
      this.params = config.params;
      /** @type {string} */
      this.key = null;
      /** @type {Phaser.GameObjects.Text} */
      this.text = null;

      this.addText(config.text, config.textStyle)
        .generateKey(config.text, config.color)
        .addBackground(config.color);
    }

    /**
     * @param {string} text
     * @param {Phaser.Types.GameObjects.Text.TextStyle} textStyle
     */
    addText(text, textStyle = TextStyle.Button) {
      this.text = this.scene.add.text(0, 0, text, textStyle)
        .setOrigin(0.5);

      this.width = this.text.width * 1.618;
      this.height = this.text.height * 1.618;

      return this.add(this.text);
    }

    /** 
     * @param {string} text 
     * @param {number} [color] 
     */
    generateKey(text, color = Color.Number.BEIGE) {
      this.key = `text-button-${text.split(' ').join('-').toLowerCase()}-${color}`;
    }

    /**
     * @param {number} [color]
     */
    addBackground(color = Color.Number.BEIGE) {
      if (!this.scene.textures.exists(this.key)) {
        this.generateTexture(color);
      } 

      this.background = this.scene.add.image(0, 0, this.key);

      return this.addAt(this.background, 0);
    }

    /** @param {number} color */
    generateTexture(color) {
      this.scene.add.graphics()
        .fillStyle(color)
        .fillRoundedRect(0, 0, this.width, this.height)
        .generateTexture(this.key, this.width, this.height)
        .destroy();
    }
  
    onPointerDown () {
      // TODO: scale the body
    }
  
    onPointerUp () {
      if (this.context)
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