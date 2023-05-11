import Phaser from 'phaser'
import color from '../../enum/color.js'
import events from '../../enum/events.js'

export default class PathUI extends Phaser.GameObjects.RenderTexture {
  constructor (scene, array) {
    super(scene)
    this.emitter = this.scene.game.emitter
    this.pathTexture = 'pathPointer'
    this.array = null
    this.generate(array)
    this.setupEvents()
    this.scene.add.existing(this)
  }

  setupEvents () {
    this.emitter.on(events.BUILDING_PLACED, this.overlaps, this)
  }

  removeEvents () {
    this.emitter.off(events.BUILDING_PLACED, this.overlaps, this)
  }

  generate (array) {
    this.array = array
    this.generateTexture()
    const image = this.scene.make.image({ key: this.pathTexture })
    this.setSize(1000, 1000)
    this.beginDraw()

    this.array.forEach(item => {
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

  overlaps (x, y, type) {
    let circle = new Phaser.Geom.Circle(0, 0, 32)
    let triangle = new Phaser.Geom.Triangle(-40, 40, 40, 40, 0, -40)
    let overlaps = false
    for (const i of this.array) {
      circle.x = i.x
      circle.y = i.y
      triangle.x1 = x - 40
      triangle.y1 = y + 40
      triangle.x2 = x + 40
      triangle.y2 = y + 40
      triangle.x3 = x
      triangle.y3 = y - 40

      if (Phaser.Geom.Intersects.TriangleToCircle(triangle, circle)) {
        this.emitter.emit(events.BUILDING_CANCELED, x, y, type)
        overlaps = true
        break
      }
    }

    if (!overlaps) this.emitter.emit(events.CAN_BE_BUILT, x, y, type)
    circle = null
    triangle = null
  }

  destroy () {
    this.removeEvents()
    super.destroy()
  }
}
