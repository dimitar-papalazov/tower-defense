import TextButton from '../../component/button/TextButton'
import Countdown from '../../component/level/countdown'
import ExitLevelPopUp from '../../component/popup/ExitLevelPopUp'
import ResourceUI from '../../component/resource/ResourceUI'
import color from '../../enum/color'
import Gui from './gui'
import ResourceManager from '../../component/resource/ResourceManager'
import TowerPicker from '../../component/level/towerPicker'
import events from '../../enum/events'
import IntroPopUp from '../../component/popup/introPopUp'
import LevelFinishPopUp from '../../component/popup/levelFinishPopUp'
import LevelSelect from '../levelSelect'
import Level from '../level.js'
import resources from '../../enum/resources.js'

export default class LevelGui extends Gui {
  /**
   * @param {Level} scene
   */
  constructor (scene) {
    super(scene)
    /**
     * @type {Level}
     */
    this.scene
    this.resetResources()
    this.createExitButton()
    this.towerPicker = new TowerPicker(this.scene)
    this.components.push(this.towerPicker)

    if (IntroPopUp.shouldShow(this.scene.level)) {
      this.components.push(new IntroPopUp(this.scene, this.createCountdown, this))
    } else {
      this.createCountdown()
    }

    this.createResourcesUI()
    this.setupEvents()
    this.components.forEach(c => { this.add(c) })
  }

  createCountdown () {
    const x = this.game.scale.width * 0.5
    const y = this.game.scale.height * 0.5
    this.countdown = new Countdown(this.scene, x, y, 10)
    this.countdown.start(this.startRow, this)
    this.components.push(this.countdown)
  }

  resetResources () {
    this.game.resourceManager.replaceResourceValue('coin', 1000)
    this.game.resourceManager.replaceResourceValue('heart', 3)
  }

  setupEvents () {
    this.game.emitter.on(events.ROW_FINISHED, this.onRowFinished, this)
    this.game.emitter.on(events.LEVEL_FINISHED, this.onLevelFinished, this)
  }

  /**
   * @param {boolean} win
   */
  onLevelFinished (win) {
    if (this.levelFinishPopUp) return
    this.levelFinishPopUp = new LevelFinishPopUp(this.scene, win, this.onPopUpClose, this)
    this.components.push(this.levelFinishPopUp)
    // this.add(this.levelFinishPopUp)
    this.scene.sys.pause()
  }

  onPopUpClose () {
    this.game.scene.add(LevelSelect.key, new LevelSelect())
    this.scene.scene.transition({ target: LevelSelect.key, duration: 0, remove: true })
  }

  onRowFinished () {
    if (this.scene.enemies.length) this.countdown.start(this.startRow, this)
    else this.game.emitter.emit(events.LEVEL_FINISHED, true)
  }

  startRow () {
    this.game.emitter.emit(events.ROW_START)
  }

  createExitButton () {
    this.exitButton = new TextButton({
      scene: this.scene,
      callback: this.exitButtonCallback,
      context: this,
      color: color.GREEN.NUMBER,
      size: '32px',
      text: 'EXIT',
      x: this.game.scale.width * 0.9,
      y: this.game.scale.height * 0.1
    })

    this.components.push(this.exitButton)
  }

  exitButtonCallback () {
    const exitLevelPopUp = new ExitLevelPopUp(this.scene)
    this.components.push(exitLevelPopUp)
    // this.add(exitLevelPopUp)
    exitLevelPopUp.open()
  }

  createResourcesUI () {
    /**
     * @type {ResourceManager}
     */
    const resourceManager = this.game.resourceManager
    const y = this.game.scale.height * 0.1
    const heartResource = resourceManager.getResource(resources.HEART.id)
    const heartX = this.game.scale.width * 0.2
    this.heartsUI = new ResourceUI(this.scene, heartResource, heartX, y)
    const coinResource = resourceManager.getResource(resources.COIN.id)
    const coinX = this.game.scale.width * 0.5
    this.coinsUI = new ResourceUI(this.scene, coinResource, coinX, y)
    this.components.push(this.heartsUI, this.coinsUI)
  }

  destroy () {
    this.game.emitter.off(events.ROW_FINISHED, this.startRow, this)
    super.destroy()
  }
}
