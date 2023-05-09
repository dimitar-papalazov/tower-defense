import LevelCreateGui from './gui/LevelCreateGui'
import TowerDefenseScene from './towerDefenseScene.js'

export default class LevelCreate extends TowerDefenseScene {
  static key = 'LevelCreate'

  /**
   * @override
   */
  constructor () {
    super({ key: LevelCreate.key })
  }

  /**
   * @override
   */
  create () {
    this.createGui()
  }

  /**
   * Creates the Gui Layer.
   */
  createGui () {
    const gui = new LevelCreateGui({ game: this.game })
    this.gui = this.game.scene.add(gui.key, gui, true)
  }
}
