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
        .generateTexture(config.color, config.lineWidth)
        .addBackground()
        .setInteractivity();

      this.tweenTargets = [this.background, this.text];
    }

    /**
     * @override
     * @param {TextButtonConfig} config
     */
    setupDefaults(config) {
      config.textStyle = TextStyle.Button;
      config.color = Color.Number.BEIGE;
      
      if (typeof config.textStyle.fontSize === 'string') {
        config.textStyle.fontSize = parseInt(config.textStyle.fontSize.replace('px', ''));
      }
      
      if (config.lineWidth === undefined) {
        if (this.height === 0) {
          config.lineWidth = Math.round(config.textStyle.fontSize * 0.2);
        } else {
          config.lineWidth = Math.round(this.height * 0.12);
        }
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
        this.width = Math.round(this.text.width * 1.618);
      }

      if (this.height === 0) {
        this.height = Math.round(this.text.height * 1.618);
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