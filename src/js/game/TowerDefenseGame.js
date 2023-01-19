import Phaser from 'phaser'
import ResourceManager from '../component/resource/ResourceManager'
import MainMenu from '../scene/MainMenu'
import resources from '../enum/resources'

export default class TowerDefenseGame extends Phaser.Game {
  constructor () {
    super({
      type: Phaser.WEBGL,
      width: 1000,
      height: 1000,
      scale: {
        mode: Phaser.Scale.FIT
      },
      seed: 1618
    })

    window.game = this
    const mainMenu = new MainMenu(this)
    this.levels = []
    this.resourceManager = new ResourceManager(this, resources)
    this.scene.add(mainMenu.key, mainMenu, true)
    this.emitter = new Phaser.Events.EventEmitter()
  }
}
