import Phaser from 'phaser'
import color from '../../enum/color'
import AddEnemy from '../AddEnemy'
import TextButton from '../button/TextButton'
import Creep from '../units/Creep'
import ArmoredCreep from '../units/ArmoredCreep'
import ShieldedCreep from '../units/ShieldedCreep'

export default class EnemyCreator extends Phaser.GameObjects.Container {
  constructor (scene) {
    super(scene)
    this.enemies = []
    this.createBackground()
    this.createSaveButton()
    this.createBackButton()
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

  createBackButton () {
    this.backButton = new TextButton({
      scene: this.scene,
      x: this.scene.game.scale.width * 0.1,
      y: this.scene.game.scale.height * 0.9,
      callback: () => {
        if (this.closeCallback && this.closeContext) this.closeCallback.apply(this.closeContext)
      },
      context: this,
      text: 'Back',
      size: '32px',
      color: color.PRIMARY.NUMBER
    })

    this.add(this.backButton)
  }

  addCloseCallback (callback, context) {
    this.closeCallback = callback
    this.closeContext = context
  }

  createAddEnemies () {
    const y = this.scene.game.scale.height * 0.2

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

    const shieldedCreepAddEnemy = new AddEnemy({
      scene: this.scene,
      x: this.scene.game.scale.width * 0.75,
      y,
      type: ShieldedCreep.TYPE
    })

    this.addEnemies = [creepAddEnemy, armoredCreepAddEnemy, shieldedCreepAddEnemy]
    this.add(this.addEnemies)
  }
}
