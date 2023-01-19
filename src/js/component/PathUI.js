import Phaser from 'phaser'
import color from '../enum/color'

export default class PathUI extends Phaser.GameObjects.RenderTexture {
  constructor (scene, array) {
    super(scene)
    this.pathTexture = 'pathPointer'
    this.generate(array)
    this.scene.add.existing(this)
  }

  generate (array) {
    this.generateTexture()
    const image = this.scene.make.image({ key: this.pathTexture })
    this.setSize(1000, 1000)
    this.beginDraw()

    array.forEach(item => {
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
