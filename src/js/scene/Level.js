import Phaser from 'phaser'
// eslint-disable-next-line no-unused-vars
import LevelGui from './gui/LevelGui'

export default class Level extends Phaser.Scene {
  constructor (game, gui, config) {
    super({ game, key: 'Level' })
    this.gui = gui
    this.path = config.path
    this.enemies = config.enemies
    this.specials = config.specials
  }

  remove () {
    this.game.scene.remove(this.gui)
    this.game.scene.remove(this)
  }
}
