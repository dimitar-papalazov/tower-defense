import Phaser from 'phaser';
import fontStyle from '../../enum/fontStyle.js';
import TowerDefenseScene from '../../scene/towerDefenseScene.js';

export default class Countdown extends Phaser.GameObjects.Text {
  /**
   * Creates a Countdown Text.
   * Its functionality it's to notify the player when does the next wave of enemies start.
   * @param {TowerDefenseScene} scene - Scene where this Countdown will be displayed
   * @param {number} x - Horizontal position of the Countdown
   * @param {number} y - Vertical position of the Countdown
   * @param {number} startsIn - Time until the next enemy wave starts
   */
  constructor (scene, x, y, startsIn) {
    super(scene, x, y, 'Wave starts in', fontStyle.COUNTDOWN);
    this.startingValue = startsIn;
    this.startsIn = startsIn;
    this.animating = false;
    this.setOrigin(0.5);
    this.setVisible(false);
    this.scene.add.existing(this);
  }

  /**
   * Starts the text animation.
   * After the animation ends, calls the provided callback
   * @param {Function} onEnd
   * @param {Object} onEndContext
   */
  start (onEnd, onEndContext) {
    if (this.visible) return;
    this.onEnd = onEnd;
    this.onEndContext = onEndContext;
    this.setVisible(true);
    this.startTween();
  }

  /**
   * Creates the text with alpha 0 to 1 animation.
   */
  startTween () {
    if (!this.scene) return;
    this.setAlpha(0);
    this.animating = true;

    this.scene.tweens.add({
      targets: [this],
      alpha: 1,
      ease: Phaser.Math.Easing.Cubic.InOut,
      duration: 600,
      onComplete: this.onAlphaIn,
      onCompleteScope: this
    });
  }

  /**
   * Callback that is executed after the alpha 0 to 1 animation completes.
   */
  onAlphaIn () {
    this.scene.tweens.add({
      targets: [this],
      alpha: 0,
      ease: Phaser.Math.Easing.Cubic.InOut,
      duration: 400,
      onComplete: this.onAlphaOut,
      onCompleteScope: this
    });
  }

  /**
   * Callback that is executed after the alpha 1 to 0 animation completes.
   * Sets what should be next displayed in this Countdown.
   * Also checks if the animation is finished.
   */
  onAlphaOut () {
    if (this.text === 'Wave starts in') this.setText(`${this.startsIn}`);
    else this.setText(`${--this.startsIn}`);

    if (this.startsIn >= 1) {
      this.startTween();
    } else {
      if (this.onEnd && this.onEndContext) this.onEnd.apply(this.onEndContext);
      this.setVisible(false);
      this.text = 'Wave starts in';
      this.startsIn = this.startingValue;
      this.animating = false;
    }
  }
}
