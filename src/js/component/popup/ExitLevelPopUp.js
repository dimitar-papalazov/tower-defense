import LevelSelect from '../../scene/levelSelect'
import PopUp from './PopUp'
import Phaser from 'phaser'
import Level from '../../scene/level'

export default class ExitLevelPopUp extends PopUp {
  /**
   * @param {Level} scene
   */
  constructor (scene) {
    super(scene, 500, 500)
    const game = scene.game
    const level = game.scene.getScene('Level')
    game.scene.pause('Level')
    this.addButton(this.gameCenterX - this.width * 0.25, this.gameCenterY + this.height * 0.5, () => {
      this.close(() => {
        // level.remove()
        const levelSelect = new LevelSelect()
        game.scene.add(LevelSelect.key, levelSelect, true)
      }, this)
    }, this, 'Yes')
    this.addButton(this.gameCenterX + this.width * 0.25, this.gameCenterY + this.height * 0.5, this.close, this, 'No')
    this.addText(this.gameCenterX, this.gameCenterY, 'Are you sure\nyou want to leave the level?\n\nAll progress will be lost!')
  }

  close (callback, context) {
    if (!this.visible) return

    this.scene.tweens.add({
      targets: [this],
      alpha: 0,
      ease: Phaser.Math.Easing.Cubic.InOut,
      duration: 800,
      onComplete: () => {
        this.scene.game.scene.resume('Level')
        this.destroy()
        if (callback && context) callback.apply(context)
      },
      onCompleteScope: this
    })
  }
}
