import TextButton from '../../component/button/TextButton'
import color from '../../enum/color'
import Gui from './Gui'
// eslint-disable-next-line no-unused-vars
import PathCreator from '../../component/PathCreator'

export default class LevelCreateGui extends Gui {
  /**
   * Creates LevelCreateGui
   * @param {object} config LevelCreateGuiConfig
   * @param {Phaser.Game} config.game
   * @param {PathCreator} config.pathCreator
   */
  constructor (config) {
    super({
      game: config.game,
      components: {
        backButton: true
      }
    })

    this.pathCreator = config.pathCreator
  }

  create () {
    super.create()
    this.createPathCreatorButton()
  }

  createPathCreatorButton () {
    this.pathCreatorButton = new TextButton({
      scene: this,
      x: this.game.scale.width * 0.9,
      y: this.game.scale.height * 0.5,
      callback: () => {
        if (this.pathCreator.enabled) {
          this.pathCreator.disable(() => {
            this.backButton.setVisible(true)
          }, this)
        } else {
          this.pathCreator.enable(() => {
            this.backButton.setVisible(false)
          }, this)
        }
      },
      context: this,
      text: 'Path',
      size: '32px',
      color: color.PRIMARY.NUMBER
    })
  }
}
