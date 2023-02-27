import LevelSelect from '../../scene/LevelSelect'
import PopUp from './PopUp'

export default class ExitLevelPopUp extends PopUp {
  constructor (scene) {
    super(scene, 500, 500)
    this.addButton(this.gameCenterX - this.width * 0.25, this.gameCenterY + this.height * 0.5, () => {
      const game = this.scene.game
      const level = game.scene.getScene('Level')

      this.close(() => {
        level.remove()
        const levelSelect = new LevelSelect(game)
        game.scene.add(levelSelect.key, levelSelect, true)
      }, this)
    }, this, 'Yes')
    this.addButton(this.gameCenterX + this.width * 0.25, this.gameCenterY + this.height * 0.5, this.close, this, 'No')
    this.addText(this.gameCenterX, this.gameCenterY, 'Are you sure\nyou want to leave the level?\n\nAll progress will be lost!')
  }
}
