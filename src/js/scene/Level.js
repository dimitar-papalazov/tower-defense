import PathUI from '../component/PathUI'
import EnemyService from '../component/services/EnemyService'
import TowerService from '../component/services/TowerService'
import fontStyle from '../enum/fontStyle'
// eslint-disable-next-line no-unused-vars
import LevelConfig from '../configs/level.config.js'
import TowerDefenseScene from './towerDefenseScene.js'

export default class Level extends TowerDefenseScene {
  static key = 'Level'

  /**
   * @param {Gui} gui delete after gui refactor
   * @param {LevelConfig} config
   */
  constructor (gui, config) {
    super({ key: Level.key })
    this.gui = gui
    this.gui.setLevel(this)
    this.path = config.path
    this.enemies = [...config.enemies]
    this.specials = config.specials
    this.level = config.level
  }

  /**
   * @override
   * Creates this Scene's GameObjects.
   */
  create () {
    this.pathUI = new PathUI(this, this.path)
    this.createPathSigns()
    this.enemyService = new EnemyService(this, this.enemies, this.path)
    this.towerService = new TowerService(this)
  }

  /**
   * Creates startSign and endSign properties, that are Text, representing start and end of the path.
   */
  createPathSigns () {
    this.startSign = this.createSign(this.path[0], 'START')
    this.endSign = this.createSign(this.path[this.path.length - 1], 'END')
  }

  /**
   * Creates a Text on the provided point, with provided text.
   * @param {PointConfig} point
   * @param {String} text
   */
  createSign (point, text) {
    const { originX, originY } = this.calculateOrigin(point.x, point.y)
    return this.add
      .text(point.x, point.y, text, fontStyle.SIGN)
      .setOrigin(originX, originY)
  }

  /**
   * Calculates the origin of a text from the provided x and y values.
   * @param {Number} x
   * @param {Number} y
   */
  calculateOrigin (x, y) {
    let isHorizontal = false
    let originX = 0.5
    let originY = 0.5
    if (x < 100) originX = 0
    else if (x > 900) originX = 1
    if (originX !== 0.5) isHorizontal = true

    if (!isHorizontal) {
      if (y < 100) originY = 0
      else if (y > 900) originY = 1
    }

    return { originX, originY }
  }

  /**
   * Removes the start & end Text signs.
   */
  removeSigns () {
    if (this.signsRemoved) return
    this.signsRemoved = true
    this.startSign.destroy()
    this.endSign.destroy()
  }

  /**
   * Removes this Scene, while destroying the Scene's GameObjects. Remove after Gui refactor.
   */
  remove () {
    this.towerService.destroy()
    this.enemyService.destroy()
    this.gui.remove()
    this.game.scene.remove(this)
  }
}

/**
 * @typedef {Object} LevelConfig
 * @property {EnemyConfig[]} enemies
 * @property {Number} level
 * @property {PointConfig[]} path
 * @property {SpecialsConfig} specials
 */
