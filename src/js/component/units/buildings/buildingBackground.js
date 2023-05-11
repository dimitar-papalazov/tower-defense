import color from '../../../enum/color.js'
import Level from '../../../scene/level.js'

export default class BuildingBackground extends Phaser.GameObjects.Image {
  static TEXTURE = 'buildingBackground'

  /**
   * @param {Level} scene 
   * @param {number} x 
   * @param {number} y 
   */
  constructor (scene, x, y) {
    super(scene, x, y, BuildingBackground.TEXTURE)
    this.generateTexture()
    this.scene.add.existing(this)
  }

  generateTexture () {
    if (this.scene.textures.exists(BuildingBackground.TEXTURE)) return
    const graphics = this.scene.add.graphics()
    graphics.fillStyle(color.WHITE.NUMBER)
    graphics.fillRoundedRect(0, 0, 100, 100)
    graphics.generateTexture(BuildingBackground.TEXTURE, 100, 100)
    graphics.destroy()
    this.setTexture(BuildingBackground.TEXTURE)
  }
}