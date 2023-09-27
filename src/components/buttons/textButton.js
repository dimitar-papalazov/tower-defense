import { ColorEnum } from '../../colors/color.enum';
import { TextStyleEnum } from '../../textStyles/textStyle.enum';

export class TextButton extends Phaser.GameObjects.Image {
  /**
   * Creates a TextButton and adds it to the provided TowerDefenseScene.
   * @param {import("./typedefs/typedefs").TextButtonConfig} config The text button configuration
   */
  constructor(config) {
    super(config.scene, config.x, config.y);
    this.callback = config.callback;
    this.context = config.context;
    this.params = config.params;

    this.addTexture(config.text)
      .setInteractive()
      .on(Phaser.Input.Events.POINTER_DOWN, this.onPointerDown, this)
      .on(Phaser.Input.Events.POINTER_UP, this.onPointerUp, this)
      .on(Phaser.Input.Events.POINTER_OUT, this.onPointerOut, this);

    this.scene.add.existing(this);
  }

  /**
   * Adds a DynamicTexture if not already existing, and sets it as texture of this TextButton
   * @param {string} s The text that needs to be displayed
   * @returns {this} Returns this object
   */
  addTexture(s) {
    const key = `button-${s.toLowerCase().split(' ').join('-')}`;

    if (this.scene.textures.exists(key)) {
      return this.setTexture(key);
    }

    const text = this.makeText(s);
    this.setSize(text.width * 1.618, text.height * 1.618);
    const dynamicTexture = this.addDynamicTexture(key);
    const images = this.makeImages();
    this.drawTexture(dynamicTexture, images, text);
    this.destroyGameObjectForTexture(images, text);
    return this.setTexture(dynamicTexture);
  }

  /**
   * Makes the Text that needs to be displayed
   * @param {string} s The text that needs to be displayed
   * @returns {Phaser.GameObjects.Text} The Text GameObject that was made
   */
  makeText(s) {
    return this.scene.make.text(
      { x: 0, y: 0, text: s, style: TextStyleEnum.Button, origin: 0.5 },
      false,
    );
  }

  /**
   * Adds a DynamicTexture to the TextureManager
   * @param {string} key The key of the DynamicTexture
   * @returns {Phaser.Textures.DynamicTexture} The DynamicTexture that was added in the TextureManager.
   * Null will not be returned due to prior check in addTexture().
   */
  addDynamicTexture(key) {
    return this.scene.textures.addDynamicTexture(key, this.width, this.height);
  }

  /**
   * Makes 3 Images that will be drawn on the DynamicTexture
   * @returns {Phaser.GameObjects.Image[]} The images that were made
   */
  makeImages() {
    const image1 = this.scene.make
      .image({ x: 0, y: 0, key: '__WHITE' }, false)
      .setDisplaySize(this.width, this.height)
      .setTint(ColorEnum.Light.Number);

    const image2 = this.scene.make
      .image({ x: 0, y: 0, key: '__WHITE' }, false)
      .setDisplaySize(this.width, this.height)
      .setTint(ColorEnum.Dark.Number);

    const image3 = this.scene.make
      .image({ x: 0, y: 0, key: '__WHITE' }, false)
      .setDisplaySize(this.width, this.height)
      .setTint(ColorEnum.Primary.Number);

    return [image1, image2, image3];
  }

  /**
   * Draws the Images and Text on the DynamicTexture
   * @param {Phaser.Textures.DynamicTexture} dynamicTexture The DynamicTexture that will be drawn on
   * @param {Phaser.GameObjects.Image[]} images Images that will be drawn on the DynamicTexture
   * @param {Phaser.GameObjects.Text} text A text that will be drawn on the DynamicTexture
   */
  drawTexture(dynamicTexture, images, text) {
    const percentX = this.width * 0.01;
    const percentY = this.height * 0.01;

    dynamicTexture
      .beginDraw()
      .batchDraw(images[0], this.width * 0.5, this.height * 0.5)
      .batchDraw(
        images[1],
        this.width * 0.5 - percentX * 2,
        this.height * 0.5 - percentY * 4,
      )
      .batchDraw(
        images[2],
        this.width * 0.5 - percentX * 4,
        this.height * 0.5 - percentY * 8,
      )
      .batchDraw(text, this.width * 0.5, this.height * 0.5)
      .endDraw();
  }

  /**
   * Destroys the made GameObjects that were drawn on the DynamicTexture
   * @param {Phaser.GameObjects.Image[]} images Image that were drawn on the DynamicTexture
   * @param {Phaser.GameObjects.Text} text A text that was drawn on the DynamicTexture
   */
  destroyGameObjectForTexture(images, text) {
    images[0].destroy();
    images[1].destroy();
    images[2].destroy();
    text.destroy();
  }

  /**
   * Animates the button, when pointing down on it.
   */
  onPointerDown() {
    this.isDown = true;

    this.scene.tweens.add({
      targets: this,
      scale: 0.95,
      ease: Phaser.Math.Easing.Quadratic.In,
      duration: 100,
    });
  }

  /**
   * Animates the button, when pointing up on it, if the button is already pointed down.
   * Fires the callback & context that were provided on creation.
   * @returns {void}
   */
  onPointerUp() {
    if (!this.isDown) {
      return;
    }

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

  /**
   * Animates the button, when pointing out of it, if the button is already pointed down.
   * @returns {void}
   */
  onPointerOut() {
    if (!this.isDown) {
      return;
    }

    this.scene.tweens.add({
      targets: this,
      scale: 1,
      ease: Phaser.Math.Easing.Quadratic.Out,
      duration: 100,
    });

    this.isDown = false;
  }
}
