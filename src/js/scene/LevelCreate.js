import Phaser from 'phaser'
import LevelCreateGui from './gui/LevelCreateGui'

export default class LevelCreate extends Phaser.Scene {
  constructor (game) {
    super({
      game,
      key: 'LevelCreate'
    })
  }

  create () {
    this.createGui()
  }

  createGui () {
    const gui = new LevelCreateGui({ game: this.game })

    this.gui = this.game.scene.add(gui.key, gui, true)
  }
}
