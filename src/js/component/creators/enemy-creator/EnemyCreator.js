import Phaser from 'phaser'
import color from '../../../enum/color'
import AddEnemy from './AddEnemy'
import TextButton from '../../button/TextButton'
import Creep from '../../units/Creep'
import ArmoredCreep from '../../units/ArmoredCreep'
import AbsorberCreep from '../../units/AbsorberCreep'
import enemy from '../../../enum/enemy'
import EnemiesRow from './EnemiesRow'

export default class EnemyCreator extends Phaser.GameObjects.Container {
  constructor (scene) {
    super(scene)
    this.enemies = []
    this.rows = []
    this.createBackground()
    this.createSaveButton()
    this.createAddRowButton()
    this.createAddEnemies()
    this.setVisible(false)
    this.scene.add.existing(this)
  }

  createBackground () {
    this.createBackgroundTexture()

    this.background = this.scene.add.image(this.scene.game.scale.width * 0.5, this.scene.game.scale.height * 0.5, 'enemyCreatorBackground')
    this.add(this.background)
  }

  createBackgroundTexture () {
    if (this.scene.textures.exists('enemyCreatorBackground')) return

    const graphics = this.scene.add.graphics()
    graphics.fillStyle(color.SECONDARY.NUMBER)
    graphics.fillRect(0, 0, this.scene.game.scale.width, this.scene.game.scale.height)
    graphics.generateTexture('enemyCreatorBackground', this.scene.game.scale.width, this.scene.game.scale.height)
    graphics.destroy()
  }

  createSaveButton () {
    this.saveButton = new TextButton({
      scene: this.scene,
      x: this.scene.game.scale.width * 0.9,
      y: this.scene.game.scale.height * 0.9,
      callback: () => {
        this.enemies = this.rows.map(r => {
          return [{
            number: r.enemies[0],
            type: Creep.TYPE
          },
          {
            number: r.enemies[1],
            type: ArmoredCreep.TYPE
          },
          {
            number: r.enemies[2],
            type: AbsorberCreep.TYPE
          }]
        })
        console.log(this.enemies)

        if (this.closeCallback && this.closeContext) this.closeCallback.apply(this.closeContext)
      },
      context: this,
      text: 'Save',
      size: '32px',
      color: color.PRIMARY.NUMBER
    })

    this.add(this.saveButton)
  }

  addCloseCallback (callback, context) {
    this.closeCallback = callback
    this.closeContext = context
  }

  createAddEnemies () {
    this.createEnemyTextures()

    const y = this.scene.game.scale.height * 0.125

    const creepAddEnemy = new AddEnemy({
      scene: this.scene,
      x: this.scene.game.scale.width * 0.25,
      y,
      type: Creep.TYPE
    })

    const armoredCreepAddEnemy = new AddEnemy({
      scene: this.scene,
      x: this.scene.game.scale.width * 0.5,
      y,
      type: ArmoredCreep.TYPE
    })

    const absorberCreepAddEnemy = new AddEnemy({
      scene: this.scene,
      x: this.scene.game.scale.width * 0.75,
      y,
      type: AbsorberCreep.TYPE
    })

    this.addEnemies = [creepAddEnemy, armoredCreepAddEnemy, absorberCreepAddEnemy]
    this.add(this.addEnemies)
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

  createAddRowButton () {
    this.addRowButton = new TextButton({
      scene: this.scene,
      x: this.scene.game.scale.width * 0.125,
      y: this.scene.game.scale.height * 0.9,
      callback: this.createRow,
      context: this,
      text: 'Add Row',
      size: '32px',
      color: color.PRIMARY.NUMBER
    })

    this.add(this.addRowButton)
  }

  createRow () {
    if (this.rows.length > 3) return

    const enemies = this.addEnemies.map(c => c.counter)

    if (enemies.every(e => e === 0)) return

    const offset = this.rows.length
    const space = this.scene.game.scale.height * 0.15

    const row = new EnemiesRow({
      scene: this.scene,
      x: this.scene.game.scale.width * 0.5,
      y: this.scene.game.scale.height * 0.325 + offset * space,
      enemies
    })

    this.rows.push(row)
    this.add(row)
    this.addEnemies.forEach(c => c.reset())
  }
}
