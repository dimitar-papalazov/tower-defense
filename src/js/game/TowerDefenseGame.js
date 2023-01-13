import Phaser from 'phaser'
import MainMenu from '../scene/MainMenu'

export default class TowerDefenseGame extends Phaser.Game {
  constructor () {
    super({
      type: Phaser.WEBGL,
      width: 1000,
      height: 1000,
      scale: {
        mode: Phaser.Scale.FIT
      }
    })

    window.game = this
    const mainMenu = new MainMenu(this)
    this.levels = []
    this.scene.add(mainMenu.key, mainMenu, true)
  }
}
