import Phaser from 'phaser'
import color from '../enum/color'

export default class AddEnemy extends Phaser.GameObjects.Container {
  /**
   * Creates AddEnemy instance
   * @param {object} config AddEnemyConfig
   * @param {Phaser.Scene} config.scene scene instance where this is created
   * @param {number} config.x horizontal position
   * @param {number} config.y vertical position
   * @param {string} config.type type of enemy
   */
  constructor (config) {
    super(config.scene)
    this.positionX = config.x
    this.positionY = config.y
    this.type = config.type
    this.createBackground()
    this.scene.add.existing(this)
  }

  createBackground () {
    this.createBackgroundTexture()
    this.background = this.scene.add.image(this.positionX, this.positionY, 'addEnemyBackground')
    this.add(this.background)
  }

  createBackgroundTexture () {
    if (this.scene.textures.exists('addEnemyBackground')) return

    const graphics = this.scene.add.graphics()
    graphics.fillStyle(color.WHITE.NUMBER)
    graphics.fillRoundedRect(0, 0, 200, 200)
    graphics.generateTexture('addEnemyBackground', 200, 200)
    graphics.destroy()
  }
}
