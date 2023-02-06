import TextButton from '../../component/button/TextButton'
import Countdown from '../../component/Countdown'
import ExitLevelPopUp from '../../component/popup/ExitLevelPopUp'
import ResourceUI from '../../component/resource/ResourceUI'
import color from '../../enum/color'
import Gui from './Gui'
// eslint-disable-next-line no-unused-vars
import ResourceManager from '../../component/resource/ResourceManager'
import TowerPicker from '../../component/TowerPicker'
import events from '../../enum/events'

export default class LevelGui extends Gui {
  constructor (game) {
    super({ game })
    this.level = null
  }

  preload () {
    this.load.image('heart', 'src/assets/images/resource/heart.png')
    this.load.image('coin', 'src/assets/images/resource/coin.png')
  }

  create () {
    this.resetResources()
    this.createExitButton()
    this.countdown = new Countdown(this, this.game.scale.width * 0.5, this.game.scale.height * 0.5, 10)
    this.countdown.start(this.startRow, this)
    this.createResourcesUI()
    this.towerPicker = new TowerPicker(this)
    this.setupEvents()
  }

  resetResources () {
    this.game.resourceManager.replaceResourceValue('coin', 1000)
    this.game.resourceManager.replaceResourceValue('heart', 3)
  }

  setLevel (level) {
    this.level = level
  }

  setupEvents () {
    this.game.emitter.on(events.ROW_FINISHED, this.onRowFinished, this)
  }

  onRowFinished () {
    if (this.level.enemies.length) this.countdown.start(this.startRow, this)
    else this.game.emitter.emit(events.LEVEL_FINISHED)
  }

  startRow () {
    this.game.emitter.emit(events.ROW_START)
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

  remove () {
    this.game.emitter.off(events.ROW_FINISHED, this.startRow, this)
    this.game.scene.remove(this)
  }
}
