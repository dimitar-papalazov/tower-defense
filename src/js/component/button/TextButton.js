import Button from './Button'
import Phaser from 'phaser'
import fontStyle from '../../enum/fontStyle'
import color from '../../enum/color'

export default class TextButton extends Button {
  /**
   * Create custom text button
   * @param {object} config TextButtonConfig
   * @param {Phaser.Scene} config.scene
   * @param {number} config.x
   * @param {number} config.y
   * @param {function} config.callback
   * @param {object} config.context
   * @param {string} config.text
   * @param {string} config.size
   * @param {number} config.color
   */
  constructor (config) {
    super(config.scene, config.x, config.y, config.callback, config.context)
    this.key = `${config.text}-button`
    this.addText(config.text, config.size)
    this.addBackground(config.color)
    this.on(Phaser.Input.Events.POINTER_OUT, this.onPointerOut, this)
    this.pointerDown = false
  }

  addBackground (color) {
    if (!this.scene.textures.exists(this.key)) {
      const graphics = this.scene.add.graphics()
      graphics.fillStyle(color)
      graphics.fillRoundedRect(0, 0, this.width, this.height)
      graphics.generateTexture(this.key, this.width, this.height)
      graphics.destroy()
    }

    const image = this.scene.add.image(this.positionX, this.positionY, this.key)
    this.addAt(image, 0)
  }

  addText (text, size) {
    const style = fontStyle.BUTTON
    style.fontSize = size
    this.text = this.scene.add.text(this.positionX, this.positionY, text, style)
      .setOrigin(0.5)
    this.updateSize()
    this.add(this.text)
  }

  updateSize () {
    const space = Math.round(this.text.height / 1.75)
    this.height = space * 3
    this.width = this.text.width + space * 2
    super.updateSize()
  }

  onPointerDown () {
    this.pointerDown = true
    this.text.setColor(color.BLACK.STRING)
  }

  onPointerUp () {
    this.pointerDown = false
    this.text.setColor(color.WHITE.STRING)
    super.onPointerUp()
  }

  onPointerOut () {
    if (this.pointerDown) this.text.setColor(color.WHITE.STRING)

    this.pointerDown = false
  }
}
