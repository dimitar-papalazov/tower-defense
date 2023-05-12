import Phaser from 'phaser'
import color from '../../enum/color.js'
import TowerDefenseScene from '../../scene/towerDefenseScene.js'

export default class PathUI extends Phaser.GameObjects.RenderTexture {
  /**
   * @param {TowerDefenseScene} scene 
   * @param {PointConfig[]} array 
   */
  constructor (scene, array) {
    super(scene)
    /**
     * @type {TowerDefenseScene}
     */
    this.scene
    this.emitter = this.scene.game.emitter
    this.pathTexture = 'pathPointer'
    this.pointsArray = array
    this.generate()
    this.scene.add.existing(this)
  }

  /**
   * Draws the path
   */
  generate () {
    this.generateTexture()
    const image = this.scene.make.image({ key: this.pathTexture })
    this.setSize(1000, 1000)
    this.beginDraw()

    this.pointsArray.forEach(item => {
      if (item.x === undefined || item.y === undefined) return
      this.batchDraw(image, item.x, item.y)
    })

    this.endDraw()
    image.destroy()
  }

  generateTexture () {
    if (this.scene.textures.exists(this.pathTexture)) return
    const graphics = this.scene.add.graphics()
    graphics.fillStyle(color.SECONDARY.NUMBER)
    graphics.fillCircle(32, 32, 32)
    graphics.generateTexture(this.pathTexture, 64, 64)
    graphics.destroy()
  }
}
