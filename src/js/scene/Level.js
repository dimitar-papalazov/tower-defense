import Phaser from 'phaser'
import PathUI from '../component/PathUI'
import EnemyService from '../component/services/EnemyService'
import TowerService from '../component/services/TowerService'
import fontStyle from '../enum/fontStyle'
// eslint-disable-next-line no-unused-vars
import LevelGui from './gui/LevelGui'

export default class Level extends Phaser.Scene {
  constructor (game, gui, config) {
    super({ game, key: 'Level' })
    this.gui = gui
    this.gui.setLevel(this)
    this.path = config.path
    this.enemies = config.enemies
    this.specials = config.specials
    this.level = config.level
  }

  create () {
    this.pathUI = new PathUI(this, this.path)
    this.createPathSigns()
    this.enemyService = new EnemyService(this, this.enemies, this.path)
    this.towerService = new TowerService(this)
  }

  createPathSigns () {
    this.startSign = this.createSign(this.path[0], 'START')
    this.endSign = this.createSign(this.path[this.path.length - 1], 'END')
  }

  createSign (point, text) {
    const { originX, originY } = this.calculateOrigin(point.x, point.y)
    return this.add.text(point.x, point.y, text, fontStyle.SIGN).setOrigin(originX, originY)
  }

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

  removeSigns () {
    if (this.signsRemoved) return
    this.signsRemoved = true
    this.startSign.destroy()
    this.endSign.destroy()
  }

  remove () {
    this.towerService.destroy()
    this.enemyService.destroy()
    this.gui.remove()
    this.game.scene.remove(this)
  }
}
