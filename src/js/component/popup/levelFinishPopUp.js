import PopUp from './PopUp'
import Phaser from 'phaser'

export default class LevelFinishPopUp extends PopUp {
  static WIN_TEXT = 'Level Completed!'
  static LOSE_TEXT = 'Level Lost'
  constructor (scene, win, onClose, onCloseContext) {
    super(scene, 500, 500)
    this.win = win
    this.onClose = onClose
    this.onCloseContext = onCloseContext
    this.addText(this.gameCenterX, this.gameCenterY, this.win ? LevelFinishPopUp.WIN_TEXT : LevelFinishPopUp.LOSE_TEXT)
    this.open()
    this.off(Phaser.Input.Events.POINTER_DOWN, this.tweenOut, this)
  }

  close () {
    super.close(this.onClose, this.onCloseContext)
  }
}
