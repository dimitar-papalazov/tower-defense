import Phaser from 'phaser'

export default class Enemy extends Phaser.GameObjects.Sprite {
  static TYPE = 'Enemy'

  constructor (scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame)
    this.type = Enemy.TYPE
    this.health = 0
    this.armor = 0
    this.magicResistance = 0
  }

  toString () {
    return JSON.stringify({
      type: this.type,
      health: this.health,
      armor: this.armor,
      magicResistance: this.magicResistance
    })
  }
}
