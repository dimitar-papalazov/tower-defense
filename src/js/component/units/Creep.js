import Enemy from './Enemy'

export default class Creep extends Enemy {
  static TYPE = 'Creep'

  constructor (scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame)

    this.health = 100
    this.armor = 20
    this.magicResistance = 20
  }
}
