import Enemy from './Enemy'

export default class ArmoredCreep extends Enemy {
  static TYPE = 'ArmoredCreep'

  constructor (scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame)
    this.type = ArmoredCreep.TYPE
  }
}
