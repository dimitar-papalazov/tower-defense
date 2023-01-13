import TextButton from './TextButton'

export default class LevelButton extends TextButton {
  /**
   * Create custom text button
   * @param {Object} config TextButtonConfig
   * @param {Phaser.Scene} config.scene
   * @param {Number} config.x
   * @param {Number} config.y
   * @param {Function} config.callback
   * @param {Object} config.context
   * @param {String} config.text
   * @param {String} config.size
   * @param {Number} config.color
   * @param {Number} config.success
   */
  constructor (config) {
    super(config)
    this.addSuccess(config.success)
  }

  addBackground (color) {
    this.key = `${this.text.text}-level-button`
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

  addSuccess (success) {
    this.success = success
  }
}
