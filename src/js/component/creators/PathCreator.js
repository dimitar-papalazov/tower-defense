import Phaser from 'phaser'
import color from '../../enum/color'

export default class PathCreator extends Phaser.GameObjects.Container {
  /**
   * Creates PathCreator
   * @param {Phaser.Scene} scene Scene object where this will draw
   */
  constructor (scene) {
    super(scene)
    this.enabled = false
    this.pointImages = []
    this.points = []
    this.clicked = false
    this.createPathPointer()
    this.scene.add.existing(this)
  }

  createPathPointer () {
    if (!this.scene.textures.exists('pathPointer')) {
      const graphics = this.scene.add.graphics()
      graphics.fillStyle(color.SECONDARY.NUMBER)
      graphics.fillCircle(32, 32, 32)
      graphics.generateTexture('pathPointer', 64, 64)
      graphics.destroy()
    }
  }

  enable () {
    this.reset()
    this.enabled = true

    if (this.enableCallback && this.enableContext) this.enableCallback.apply(this.enableContext)

    this.init()
  }

  disable () {
    this.enabled = false
    this.clicked = false

    if (this.disableCallback && this.disableContext) this.disableCallback.apply(this.disableContext)

    this.points = this.pointImages.map(p => {
      return {
        x: p.x,
        y: p.y
      }
    })
  }

  init () {
    this.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.scene.game.scale.width, this.scene.game.scale.height), Phaser.Geom.Rectangle.Contains)

    this.on(Phaser.Input.Events.POINTER_MOVE, pointer => {
      if (!pointer.isDown || !this.enabled) {
        if (this.clicked) this.disable()
      }

      if (pointer.isDown && this.enabled) {
        const pointImage = this.scene.add.image(pointer.x, pointer.y, 'pathPointer')
        this.pointImages.push(pointImage)
        this.add(pointImage)
        this.clicked = true
      }
    })
  }

  reset () {
    this.points = []
    this.pointImages.forEach(p => p.destroy())
    this.pointImages = []
    this.disableInteractive()
  }

  addCallbacks (config) {
    if (config.enable) {
      this.enableCallback = config.enable.callback
      this.enableContext = config.enable.context
    }

    if (config.disable) {
      this.disableCallback = config.disable.callback
      this.disableContext = config.disable.context
    }
  }
}
