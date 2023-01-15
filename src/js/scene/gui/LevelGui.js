import TextButton from '../../component/button/TextButton'
import Countdown from '../../component/Countdown'
import ExitLevelPopUp from '../../component/popup/ExitLevelPopUp'
import ResourceUI from '../../component/resource/ResourceUI'
import color from '../../enum/color'
import Gui from './Gui'
// eslint-disable-next-line no-unused-vars
import ResourceManager from '../../component/resource/ResourceManager'

export default class LevelGui extends Gui {
  constructor (game) {
    super({ game })
  }

  preload () {
    this.load.image('heart', 'src/assets/images/resource/heart.png')
    this.load.image('coin', 'src/assets/images/resource/coin.png')
  }

  create () {
    this.createExitButton()
    this.countdown = new Countdown(this, this.game.scale.width * 0.5, this.game.scale.height * 0.5, 5)
    this.createResourcesUI()
  }

  createExitButton () {
    this.exitButton = new TextButton({
      scene: this,
      callback: () => {
        const exitPopUp = new ExitLevelPopUp(this)
        exitPopUp.open()
      },
      context: this,
      color: color.GREEN.NUMBER,
      size: '32px',
      text: 'EXIT',
      x: this.game.scale.width * 0.9,
      y: this.game.scale.height * 0.1
    })
  }

  createResourcesUI () {
    /**
     * @type {ResourceManager}
     */
    const resourceManager = this.game.resourceManager
    this.heartsUI = new ResourceUI(this, resourceManager.getResource(0), this.game.scale.width * 0.2, this.game.scale.height * 0.1)
    this.coinsUI = new ResourceUI(this, resourceManager.getResource(1), this.game.scale.width * 0.5, this.game.scale.height * 0.1)
  }
}
