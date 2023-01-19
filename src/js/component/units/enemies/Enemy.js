import Phaser from 'phaser'
import events from '../../../enum/events'
import damageCalculator from '../../damageCalculator'

export default class Enemy extends Phaser.GameObjects.Sprite {
  static TYPE = 'Enemy'

  constructor (scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame)
    this.emitter = this.scene.game.emitter
    this.type = Enemy.TYPE
    this.health = 0
    this.armor = 0
    this.magicResistance = 0
    this.id = -1
    this.dead = false
    this.emitter.on(events.ENEMY_ATTACKED, this.getHit, this)
    this.scene.add.existing(this)
  }

  getHit (id, type) {
    if (this.id !== id) return
    this.health -= damageCalculator(type, this.type)

    if (this.health <= 0) {
      this.dead = true
      this.emitter.emit(events.ENEMY_KILLED)
      this.destroy()
    }
  }

  toString () {
    return JSON.stringify({
      type: this.type,
      health: this.health,
      armor: this.armor,
      magicResistance: this.magicResistance
    })
  }

  destroy () {
    this.emitter.off(events.ENEMY_ATTACKED, this.getHit, this)
    super.destroy()
  }
}
