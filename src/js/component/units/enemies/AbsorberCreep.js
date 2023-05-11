import enemy from '../../../enum/enemy.js'
import Enemy from './Enemy'

export default class AbsorberCreep extends Enemy {
  static TYPE = enemy.ABSORBER_CREEP.TYPE

  constructor (scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame)
    this.type = AbsorberCreep.TYPE
  }
}
