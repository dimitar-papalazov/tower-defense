import Phaser from 'phaser'

export default class Enemy extends Phaser.GameObjects.Sprite {
  constructor (scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame)

    this.health = 0
    this.armor = 0
    this.magicResistance = 0
  }
}
