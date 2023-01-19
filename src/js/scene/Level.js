import Phaser from 'phaser'
import PathUI from '../component/PathUI'
import EnemyService from '../component/services/EnemyService'
import TowerService from '../component/services/TowerService'
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

  create () {
    this.pathUI = new PathUI(this, this.path)
    this.enemyService = new EnemyService(this, this.enemies, this.path)
    this.towerService = new TowerService(this)
  }

  remove () {
    this.towerService.destroy()
    this.enemyService.destroy()
    this.game.scene.remove(this.gui)
    this.game.scene.remove(this)
  }
}
