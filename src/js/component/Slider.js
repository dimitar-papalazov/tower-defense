import Phaser from 'phaser'

export default class Slider extends Phaser.GameObjects.Container {
  /**
   * Creates Slider Container Object
   * @param {Object} config provide SliderConfig Object
   * @param {Phaser.Scene} config.scene provide Phaser.Scene Object where this Slider will be used
   * @param {Number} config.x provide Slider's starting horizontal position
   * @param {Number} config.y provide Slider's starting vertical position
   * @param {Number} config.width provide Slider's width
   * @param {Number} config.height provide Slider's height
   * @param {Number} config.spaceBetween - provide how much the items should be spaced
   */
  constructor (config) {
    super(config.scene)
    this.positionX = config.x
    this.positionY = config.y
    this.width = config.width
    this.height = config.height
    this.spaceBetween = config.spaceBetween
    this.nextItemPosition = this.positionY + this.spaceBetween
    this.addMask()
    this.addInput()
    this.on(Phaser.Input.Events.GAMEOBJECT_DRAG, this.onDrag, this)
    this.scene.add.existing(this)
    this.scene.input.enableDebug(this)
  }

  addMask () {
    const rectangle = this.scene.add.rectangle(this.positionX + this.width / 2, this.positionY + this.height / 2, this.width, this.height, 0xffffff)
    const mask = rectangle.createBitmapMask()
    this.setMask(mask)
  }

  addInput (rectangle = null) {
    if (!rectangle) {
      rectangle = new Phaser.Geom.Rectangle(this.positionX + this.width / 2, this.positionY + this.height / 2, this.width, this.height)
    }

    this.setInteractive(rectangle, Phaser.Geom.Rectangle.Contains)
    this.scene.input.setDraggable(this)
    this.dragMax = 0
    this.dragMin = this.scene.game.scale.height - (this.positionY + this.height)
  }

  /**
   * @param {Phaser.Input.Pointer} pointer The Pointer responsible for triggering this event.
   * @param {Number} dragX The x coordinate where the Pointer is currently dragging the Game Object, in world space.
   * @param {Number} dragY The y coordinate where the Pointer is currently dragging the Game Object, in world space.
   */
  onDrag (pointer, dragX, dragY) {
    if (dragY < this.dragMin) this.y = this.dragMin
    else if (dragY > this.dragMax) this.y = this.dragMax
    else this.y = dragY
  }

  /**
   * @param {Phaser.GameObjects.GameObject} item
   */
  addItem (item) {
    if (!item || isNaN(item.height)) throw new Error('Provided item has no height property!')
    if (!item || isNaN(item.x)) throw new Error('Provided item has no x property!')
    if (!item || isNaN(item.y)) throw new Error('Provided item has no y property!')
    this.add(item)
    item.x = this.positionX + this.width / 2
    item.y = this.nextItemPosition + item.height / 2
    this.nextItemPosition += item.height / 2 + this.spaceBetween
    this.updateSize()
  }

  updateSize () {
    // this.removeInteractive()
    if (this.nextItemPosition < this.height) return
    this.height = this.nextItemPosition
    console.log(this.positionX, this.positionY, this.width, this.height)
    this.addInput(new Phaser.Geom.Rectangle(this.positionX, this.positionY, this.width, this.height))
  }
}
