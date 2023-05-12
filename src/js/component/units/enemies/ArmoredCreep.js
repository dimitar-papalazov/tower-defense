import enemy from '../../../enum/enemy.js'
import Enemy from './enemy'
import TowerDefenseScene from '../../../scene/towerDefenseScene.js'

export default class ArmoredCreep extends Enemy {
  static TYPE = enemy.ARMORED_CREEP.TYPE
  static COLOR = enemy.ARMORED_CREEP.COLOR

  /**
   * @param {TowerDefenseScene} scene
   * @param {number} x
   * @param {number} y
   */
  constructor (scene, x, y) {
    super(scene, x, y)
    this.type = ArmoredCreep.TYPE
    this.color = ArmoredCreep.COLOR
    this.setTint(this.color)
  }
}
