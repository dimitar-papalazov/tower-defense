import Color from '../../namespaces/color.js';
import TextStyle from '../../namespaces/textStyle.js';
import Button from './button.js';
import './typedefs/buttonConfig.js';

export default class TextButton extends Button {
    /** @param {TextButtonConfig} config */
    constructor (config) {
      super(config);

      this.setupDefaults(config)
        .addText(config.text, config.textStyle)
        .generateKey(config.text, config.color)
        .generateTexture(config.color)
        .addBackground()
        .setInteractivity();

      this.tweenTargets = [this.background, this.text];
    }

    /**
     * @override
     * @param {TextButtonConfig} config
     */
    setupDefaults(config) {
      config.color = Color.Number.BEIGE;

      if (!config.textStyle) {
        config.textStyle = TextStyle.Button;
      }
      
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
      this.text = this.scene.add.text(0, 0, text, textStyle)
        .setOrigin(0.5);

      if (this.width === 0) {
        this.width = Math.round(this.text.width * 1.6);
      }

      if (this.height === 0) {
        this.height = Math.round(this.text.height * 1.6);
      }

      return this.add(this.text);
    }

    /** 
     * @override
     * @param {string} text 
     * @param {number} color
     */
    generateKey(text, color) {
      this.key = `text-button-${text.split(' ').join('-').toLowerCase()}-${color}-${this.width}-${this.height}`;

      return this;
    }
  }