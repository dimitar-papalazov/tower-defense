import enemy from '../../../enum/enemy.js'
import Enemy from './enemy'
import TowerDefenseScene from '../../../scene/towerDefenseScene.js'

export default class AbsorberCreep extends Enemy {
  static TYPE = enemy.ABSORBER_CREEP.TYPE
  static COLOR = enemy.ABSORBER_CREEP.COLOR

  /**
   * @param {TowerDefenseScene} scene
   * @param {number} x
   * @param {number} y
   */
  constructor (scene, x, y) {
    super(scene, x, y)
    this.type = AbsorberCreep.TYPE
    this.color = AbsorberCreep.COLOR
    this.setTint(this.color)
  }
}
