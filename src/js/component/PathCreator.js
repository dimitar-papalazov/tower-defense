import Phaser from 'phaser'
import color from '../enum/color'

export default class PathCreator {
  /**
   * Creates PathCreator
   * @param {Phaser.Scene} scene Scene object where this will draw
   */
  constructor (scene) {
    this.scene = scene
    this.enabled = false
    this.pointImages = []
    this.createPathPointer()
  }

  createPathPointer () {
    if (!this.scene.textures.exists('pathPointer')) {
      const graphics = this.scene.add.graphics()
      graphics.fillStyle(color.PRIMARY.NUMBER)
      graphics.fillCircle(32, 32, 32)
      graphics.generateTexture('pathPointer', 64, 64)
      graphics.destroy()
    }
  }

  enable (callback, context) {
    this.enabled = true
    callback.apply(context)
    this.init()
  }

  disable (callback, context) {
    this.enabled = false
    callback.apply(context)

    this.points = this.pointImages.map(p => {
      return {
        x: p.x,
        y: p.y
      }
    })

    // this.points.forEach(p => p.destroy())
    console.log(this.points)
  }

  init () {
    this.scene.input.on(Phaser.Input.Events.POINTER_MOVE, pointer => {
      if (!pointer.isDown || !this.enabled) return

      this.pointImages.push(this.scene.add.image(pointer.x, pointer.y, 'pathPointer'))
    })
  }
}
