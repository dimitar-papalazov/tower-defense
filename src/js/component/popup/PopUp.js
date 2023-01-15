import Phaser from 'phaser'
import color from '../../enum/color'
import fontStyle from '../../enum/fontStyle'
import TextButton from '../button/TextButton'

export default class PopUp extends Phaser.GameObjects.Container {
  constructor (scene, width, height) {
    super(scene)
    this.width = width
    this.height = height
    this.gameWidth = this.scene.game.scale.width
    this.gameHeight = this.scene.game.scale.height
    this.gameCenterX = this.gameWidth * 0.5
    this.gameCenterY = this.gameHeight * 0.5
    this.key = `pop-up-${this.width}-${this.height}`
    this.createBackground()
    this.createBackButton()
    this.setVisible(false)
    this.scene.add.existing(this)
    this.setInteractive()
  }

  setInteractive () {
    super.setInteractive(new Phaser.Geom.Rectangle(this.gameWidth / 4, this.gameHeight / 4, this.gameWidth, this.gameHeight), Phaser.Geom.Rectangle.Contains)
    this.once(Phaser.Input.Events.POINTER_DOWN, this.tweenOut, this)
  }

  open (callback, context) {
    if (callback && context) callback.apply(context)
    if (this.visible) return
    this.setAlpha(0)
    this.setVisible(true)

    this.scene.tweens.add({
      targets: [this],
      alpha: 1,
      ease: Phaser.Math.Easing.Cubic.InOut,
      duration: 800
    })
  }

  close (callback, context) {
    if (!this.visible) return

    this.scene.tweens.add({
      targets: [this],
      alpha: 0,
      ease: Phaser.Math.Easing.Cubic.InOut,
      duration: 800,
      onComplete: () => {
        this.destroy()
        if (callback && context) callback.apply(context)
      },
      onCompleteScope: this
    })
  }

  createBackground () {
    this.createBackgroundTexture()
    this.background = this.scene.add.image(this.gameCenterX, this.gameCenterY, this.key)
    this.add(this.background)
  }

  createBackgroundTexture () {
    if (this.scene.textures.exists(this.key)) return
    const graphics = this.scene.add.graphics()
    graphics.fillStyle(color.PRIMARY.NUMBER)
    graphics.fillRoundedRect(0, 0, this.width, this.height)
    graphics.generateTexture(this.key, this.width, this.height)
    graphics.destroy()
  }

  addItem (item) {
    this.add(item)
  }

  addButton (x, y, callback, context, text) {
    this.addItem(new TextButton({
      scene: this.scene,
      x,
      y,
      callback,
      context,
      text,
      color: color.SECONDARY.NUMBER,
      size: '24px'
    }))
  }

  addText (x, y, text) {
    this.addItem(this.scene.add.text(x, y, text, fontStyle.POP_UP_TEXT).setOrigin(0.5))
  }

  createBackButton () {
    const x = this.gameCenterX + this.width * 0.5
    const y = this.gameCenterY - this.height * 0.5
    this.addButton(x, y, this.close, this, 'X')
  }

  tweenIn () {
    if (this.visible) return
    this.setAlpha(0)
    this.setVisible(true)

    this.scene.tweens.add({
      targets: [this],
      alpha: 1,
      ease: Phaser.Math.Easing.Cubic.InOut,
      duration: 800
    })
  }

  tweenOut () {
    if (!this.visible) return

    this.scene.tweens.add({
      targets: [this],
      alpha: 0,
      ease: Phaser.Math.Easing.Cubic.InOut,
      duration: 800,
      onComplete: this.destroy,
      onCompleteScope: this
    })
  }
}