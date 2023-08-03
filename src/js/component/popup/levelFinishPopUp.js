import PopUp from './popUp';
import Level from '../../scene/level';
import eventsEnum from '../../enum/events';

export default class LevelFinishPopUp extends PopUp {
  static WIN_TEXT = 'Level Completed!';
  static LOSE_TEXT = 'Level Lost';

  /**
   * @param {Level} scene
   * @param {boolean} win
   * @param {Function} onClose
   * @param {*} onCloseContext
   */
  constructor (scene, win, onClose, onCloseContext) {
    super(scene, 500, 500);
    /** @type {Level} */
    this.scene;
    this.scene.game.emitter.emit(eventsEnum.LEVEL_PAUSE);
    this.win = win;
    this.onClose = onClose;
    this.onCloseContext = onCloseContext;

    this.addText(
      this.gameCenterX,
      this.gameCenterY,
      this.win ? LevelFinishPopUp.WIN_TEXT : LevelFinishPopUp.LOSE_TEXT
    );

    this.open();
  }

  close () {
    this.scene.game.emitter.emit(eventsEnum.LEVEL_RESUME);
    super.close(this.onClose, this.onCloseContext);
  }
}
