import enemy from '../../../enum/enemy.js'
import Enemy from './Enemy'

export default class ArmoredCreep extends Enemy {
  static TYPE = enemy.ARMORED_CREEP.TYPE

  constructor (scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame)
    this.type = ArmoredCreep.TYPE
  }
}
