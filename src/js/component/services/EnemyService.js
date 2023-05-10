import AbsorberCreep from '../units/enemies/AbsorberCreep'
import ArmoredCreep from '../units/enemies/ArmoredCreep'
import Creep from '../units/enemies/Creep'
import Phaser from 'phaser'
import Level from '../../scene/level'
import enemy from '../../enum/enemy'
import events from '../../enum/events'
import color from '../../enum/color'

export default class EnemyService {
  /**
   *
   * @param {Level} scene
   * @param {*} enemies
   * @param {*} path
   */
  constructor (scene, enemies, path) {
    this.scene = scene
    this.emitter = this.scene.game.emitter
    this.resourceManager = this.scene.game.resourceManager
    this.enemies = enemies
    this.path = path
    this.currentRow = []
    this.enemiesKilled = 0
    this.enemiesFinished = 0
    this.enemiesInCurrentRow = 0
    this.createEnemyTextures()
    this.setupEvents()
  }

  setupEvents () {
    this.emitter.on(events.ENEMY_FINISHED, this.onEnemyFinished, this)
    this.emitter.on(events.ENEMY_KILLED, this.onEnemyKilled, this)
    this.emitter.on(events.ROW_START, this.startRow, this)
  }

  onEnemyFinished () {
    this.resourceManager.updateResource('heart', -1)

    if (this.resourceManager.getResource('heart').value === 0) {
      this.emitter.emit(events.LEVEL_FINISHED, false)
      return
    }

    this.enemiesFinished++
    if (this.enemiesKilled + this.enemiesKilled === this.enemiesInCurrentRow) this.emitter.emit(events.ROW_FINISHED)
  }

  onEnemyKilled (id) {
    this.resourceManager.updateResource('coin', 10)
    this.enemiesKilled++
    let toSplice = -1

    for (let i = 0; i < this.currentRow; i++) {
      if (this.currentRow[i].id === id) {
        toSplice = i
        break
      }
    }

    this.currentRow.splice(toSplice, 1)
    if (!this.currentRow.length) this.emitter.emit(events.ROW_FINISHED)
  }

  startRow () {
    this.scene.removeSigns()
    this.enemiesKilled = 0
    const row = this.enemies.shift()
    if (!row) return

    const enemies = row.map(item => {
      const array = []

      for (let i = 0; i < item.number; i++) {
        let e = null
        if (item.type === Creep.TYPE) {
          e = new Creep(this.scene, this.path[0].x - 100, this.path[0].y, enemy.CREEP.TEXTURE)
        } else if (item.type === AbsorberCreep.TYPE) {
          e = new AbsorberCreep(this.scene, this.path[0].x - 100, this.path[0].y, enemy.ABSORBER_CREEP.TEXTURE)
        } else if (item.type === ArmoredCreep.TYPE) {
          e = new ArmoredCreep(this.scene, this.path[0].x - 100, this.path[0].y, enemy.ARMORED_CREEP.TEXTURE)
        }

        e.setScale(0.5)
        e.id = i
        array.push(e)
      }

      return Phaser.Math.RND.shuffle(array)
    })

    this.currentRow = Phaser.Math.RND.shuffle(enemies.flat())
    this.enemiesInCurrentRow = this.currentRow.length
    this.startMoving()
  }

  startMoving () {
    const enemyLength = this.currentRow.length

    for (let i = 0; i < enemyLength; i++) {
      this.scene.time.delayedCall(1600 * i, this.moveEnemy, [this.currentRow[i]], this)
    }
  }

  moveEnemy (e) {
    if (e.dead) return
    if (e.position === undefined) e.position = 0
    else e.position++

    if (e.position === this.path.length) {
      this.emitter.emit(events.ENEMY_FINISHED)
      e.destroy()
      return
    }

    const { x, y } = this.path[e.position]
    e.setX(x)
    e.setY(y)
    this.emitter.emit(events.ENEMY_MOVED, e)
    this.scene.time.delayedCall(20, this.moveEnemy, [e], this)
  }

  createEnemyTextures () {
    const graphics = this.scene.add.graphics()

    if (!this.scene.textures.exists(enemy.CREEP.TEXTURE)) {
      graphics.fillStyle(color.MAGENTA.NUMBER)
      graphics.fillRoundedRect(0, 0, 100, 100)
      graphics.generateTexture(enemy.CREEP.TEXTURE, 100, 100)
      graphics.clear()
    }

    if (!this.scene.textures.exists(enemy.ARMORED_CREEP.TEXTURE)) {
      graphics.fillStyle(color.YELLOW.NUMBER)
      graphics.fillRoundedRect(0, 0, 100, 100)
      graphics.generateTexture(enemy.ARMORED_CREEP.TEXTURE, 100, 100)
      graphics.clear()
    }

    if (!this.scene.textures.exists(enemy.ABSORBER_CREEP.TEXTURE)) {
      graphics.fillStyle(color.TURQUOISE.NUMBER)
      graphics.fillRoundedRect(0, 0, 100, 100)
      graphics.generateTexture(enemy.ABSORBER_CREEP.TEXTURE, 100, 100)
      graphics.clear()
    }

    graphics.destroy()
  }

  destroy () {
    this.emitter.off(events.ENEMY_FINISHED, this.onEnemyFinished, this)
    this.emitter.off(events.ENEMY_KILLED, this.onEnemyKilled, this)
    this.emitter.off(events.ROW_START, this.startRow, this)
  }
}
