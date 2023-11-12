import Color from '../../namespaces/color.js';
import TextStyle from '../../namespaces/textStyle.js';
import './typedefs/textButtonConfig.js'

export default class TextButton extends Phaser.GameObjects.Container {
    /** @param {TextButtonConfig} config */
    constructor (config) {
      super(config.scene, config.x, config.y);

      this.callback = config.callback;
      this.context = config.context;
      this.params = config.params;
      this.width = config.width ?? 0;
      this.height = config.height ?? 0;
      this.clicked = false;

      this.setupDefaults(config)
        .addText(config.text, config.textStyle)
        .generateKey(config.text, config.color)
        .generateTexture(config.color, config.lineWidth)
        .addBackground(config.color)
        .setInteractive(new Phaser.Geom.Rectangle(0, 0, this.width, this.height), Phaser.Geom.Rectangle.Contains)
        .on(Phaser.Input.Events.POINTER_DOWN, this.onPointerDown)
        .on(Phaser.Input.Events.POINTER_UP, this.onPointerUp)
        .on(Phaser.Input.Events.POINTER_OUT, this.onPointerOut);

      this.scene.add.existing(this);
    }

    /**
     * @param {TextButtonConfig} config
     */
    setupDefaults(config) {
      config.textStyle = TextStyle.Button;
      config.color = Color.Number.BEIGE;
      
      if (typeof config.textStyle.fontSize === 'string') {
        config.textStyle.fontSize = parseInt(config.textStyle.fontSize.replace('px', ''));
      }
      
      if (this.height === 0) {
        config.lineWidth = Math.round(config.textStyle.fontSize * 0.2);
      } else {
        config.lineWidth = Math.round(this.height * 0.12);
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
     * @param {string} text 
     * @param {number} color
     */
    generateKey(text, color) {
      this.key = `text-button-${text.split(' ').join('-').toLowerCase()}-${color}-${this.width}-${this.height}`;

      return this;
    }

    /**
     * @param {number} color
     */
    addBackground(color = Color.Number.BEIGE) {
      if (!this.scene.textures.exists(this.key)) {
        this.generateTexture(color);
      } 

      this.background = this.scene.add.image(0, 0, this.key);

      return this.addAt(this.background, 0);
    }

    /** 
     * @param {number} color 
     * @param {number} lineWidth 
     */
    generateTexture(color, lineWidth) {
      if (this.scene.textures.exists(this.key)) {
        return this;
      } 

      const darker = Color.darken(color, 0.1, false);
      const lighter = Color.lighten(color, 0.1, false);

      this.scene.add.graphics()
        .fillStyle(color)
        .fillRect(0, 0, this.width, this.height)
        .lineStyle(lineWidth, darker)
        .lineBetween(0, 0, 0, this.height - lineWidth * 0.5)
        .lineBetween(0, this.height, this.width, this.height)
        .lineStyle(lineWidth, lighter)
        .lineBetween(lineWidth * 0.5, 0, this.width, 0)
        .lineBetween(this.width, 0, this.width, this.height)
        .generateTexture(this.key, this.width, this.height)
        .destroy();

      return this;
    }
  
    onPointerDown () {
      this.clicked = true;

      this.scene.add.tween({
        targets: [this.background, this.text],
        scale: 0.9,
        ease: Phaser.Math.Easing.Expo.In,
        duration: 100,
      });
    }
  
    onPointerUp () {
      const onComplete = () => {
        if (!this.clicked) {
          return;
        }

        if (this.context && this.params) {
          this.callback.apply(this.context, this.params)
        } else if (this.context) {
          this.callback.apply(this.context)
        } else {
          this.callback();
        }
      };

      this.scene.add.tween({
        targets: [this.background, this.text],
        scale: 1,
        ease: Phaser.Math.Easing.Expo.In,
        duration: 100,
        onComplete,
      });
    }

    onPointerOut () {
      this.clicked = false;

      this.scene.add.tween({
        targets: [this.background, this.text],
        scale: 1,
        ease: Phaser.Math.Easing.Expo.In,
        duration: 100
      });
    }
  
    /** @param {boolean} value */
    setVisible (value) {
      if (value && !this.input.enabled) {
        this.setInteractive();
      } else if (!value && this.input.enabled) {
        this.disableInteractive();
      }
  
      return super.setVisible(value);
    }
  }