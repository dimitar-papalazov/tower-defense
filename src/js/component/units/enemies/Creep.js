import enemy from '../../../enum/enemy.js'
import Enemy from './Enemy'

export default class Creep extends Enemy {
  static TYPE = enemy.CREEP.TYPE

  constructor (scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame)
    this.type = Creep.TYPE
  }
}
