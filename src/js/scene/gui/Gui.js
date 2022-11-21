import Phaser from 'phaser'
import TextButton from '../../component/button/TextButton'
import color from '../../enum/color'
import MainMenu from '../MainMenu'

export default class Gui extends Phaser.Scene {
  /**
   * Creates Gui Scene
   * @param {object} config
   * @param {Phaser.Game} config.game
   * @param {object} config.components
   * @param {boolean} config.backButton
   */
  constructor (config) {
    super({
      game: config.game,
      key: 'Gui'
    })

    this.hasBackButton = config.components.backButton
  }

  create () {
    if (this.hasBackButton) this.createBackButton()
  }

  createBackButton () {
    this.backButton = new TextButton({
      scene: this,
      x: this.game.scale.width * 0.1,
      y: this.game.scale.height * 0.9,
      callback: () => {
        const mainMenu = new MainMenu(this.game)
        this.game.scene.add(mainMenu.key, mainMenu, true)
        this.game.scene.remove(this)
      },
      context: this,
      text: 'Back',
      size: '32px',
      color: color.PRIMARY.NUMBER
    })
  }
}
