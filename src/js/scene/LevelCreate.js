import Phaser from 'phaser'
import PathCreator from '../component/PathCreator'
import LevelCreateGui from './gui/LevelCreateGui'

export default class LevelCreate extends Phaser.Scene {
  constructor (game) {
    super({
      game,
      key: 'LevelCreate'
    })
  }

  create () {
    this.pathCreator = new PathCreator(this)
    this.createGui()
  }

  createGui () {
    const gui = new LevelCreateGui({
      game: this.game,
      pathCreator: this.pathCreator
    })

    this.gui = this.game.scene.add(gui.key, gui, true)
  }
}
