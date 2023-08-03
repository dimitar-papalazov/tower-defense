import LevelSelect from '../../scene/levelSelect';
import PopUp from './popUp';
import Phaser from 'phaser';
import Level from '../../scene/level';
import eventsEnum from '../../enum/events';

export default class ExitLevelPopUp extends PopUp {
  /**
   * @param {Level} scene
   */
  constructor (scene) {
    super(scene, 500, 500);
    /** @type {Level} */
    this.scene;
    this.scene.game.emitter.emit(eventsEnum.LEVEL_PAUSE);

    this.addButton(
      this.gameCenterX - this.width * 0.25,
      this.gameCenterY + this.height * 0.5,
      this.onConfirm,
      this,
      'Yes'
    );

    this.addButton(
      this.gameCenterX + this.width * 0.25,
      this.gameCenterY + this.height * 0.5,
      this.close,
      this,
      'No'
    );

    this.addText(
      this.gameCenterX,
      this.gameCenterY,
      'Are you sure\nyou want to leave the level?\n\nAll progress will be lost!'
    );

    this.open();
  }

  onConfirm () {
    this.close(() => {
      this.scene.scene.add(LevelSelect.key, new LevelSelect(), true);
      this.scene.sys.shutdown();
    });
  }

  /**
   * @override
   * @param {Function} callback
   * @param {*} context
   */
  close (callback, context) {
    if (!this.visible) return;

    const onComplete = () => {
      this.scene.game.emitter.emit(eventsEnum.LEVEL_RESUME);
      if (callback && context) callback.call(context);
      else if (callback) callback.call();
    };

    this.scene.tweens.add({
      targets: [this],
      alpha: 0,
      ease: Phaser.Math.Easing.Cubic.InOut,
      duration: 800,
      onComplete
    });
  }
}
