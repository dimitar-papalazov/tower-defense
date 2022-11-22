import Enemy from './Enemy'

export default class ShieldedCreep extends Enemy {
  static TYPE = 'ShieldedCreep'

  constructor (scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame)

    this.health = 100
    this.armor = 0
    this.magicResistance = 80
  }
}
