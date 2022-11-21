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
    this.createPathPointer()
  }

  createPathPointer () {
    if (!this.scene.textures.exists('pathPointer')) {
      const graphics = this.scene.add.graphics()
      graphics.fillStyle(color.PRIMARY.NUMBER)
      graphics.fillCircle(0, 0, 100)
      graphics.generateTexture('pathPointer', 100, 100)
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
  }

  init () {
    this.scene.input.on(Phaser.Input.Events.POINTER_MOVE, pointer => {
      if (!pointer.isDown) return

      this.scene.add.image(pointer.x, pointer.y, 'pathPointer')
    })
  }
}
