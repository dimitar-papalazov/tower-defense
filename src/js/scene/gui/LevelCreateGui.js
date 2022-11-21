import TextButton from '../../component/button/TextButton'
import color from '../../enum/color'
import Gui from './Gui'

export default class LevelCreateGui extends Gui {
  constructor (game) {
    super({
      game,
      components: {
        backButton: true
      }
    })
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
      callback: () => { },
      context: this,
      text: 'Path',
      size: '32px',
      color: color.PRIMARY.NUMBER
    })
  }
}
