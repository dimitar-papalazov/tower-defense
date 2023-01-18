import Enemy from './Enemy'

export default class AbsorberCreep extends Enemy {
  static TYPE = 'AbsorberCreep'

  constructor (scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame)
    this.type = AbsorberCreep.TYPE
    this.health = 100
    this.armor = 0
    this.magicResistance = 80
  }
}
