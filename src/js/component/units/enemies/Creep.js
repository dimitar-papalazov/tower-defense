import Enemy from './Enemy'

export default class Creep extends Enemy {
  static TYPE = 'Creep'

  constructor (scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame)
    this.type = Creep.TYPE
  }
}
