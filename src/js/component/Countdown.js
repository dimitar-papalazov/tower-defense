import Phaser from 'phaser'
import fontStyle from '../enum/fontStyle'

export default class Countdown extends Phaser.GameObjects.Text {
  constructor (scene, x, y, startsIn) {
    super(scene, x, y, 'Wave starts in', fontStyle.COUNTDOWN)
    this.startingValue = startsIn
    this.startsIn = startsIn
    this.setOrigin(0.5)
    this.setVisible(false)
    this.scene.add.existing(this)
  }

  start (onEnd, onEndContext) {
    if (this.visible) return
    this.onEnd = onEnd
    this.onEndContext = onEndContext
    this.setAlpha(0)
    this.setVisible(true)
    this.startTween()
  }

  startTween () {
    this.scene.tweens.add({
      targets: [this],
      alpha: 1,
      ease: Phaser.Math.Easing.Cubic.InOut,
      duration: 600,
      onComplete: () => {
        this.scene.tweens.add({
          targets: [this],
          alpha: 0,
          ease: Phaser.Math.Easing.Cubic.InOut,
          duration: 400,
          onComplete: () => {
            if (this.text === 'Wave starts in') this.setText(this.startsIn)
            else this.setText(--this.startsIn)

            if (this.startsIn >= 1) {
              this.startTween()
            } else {
              if (this.onEnd && this.onEndContext) this.onEnd.apply(this.onEndContext)
              this.setVisible(false)
              this.text = 'Wave starts in'
              this.startsIn = this.startingValue
            }
          }
        })
      }
    })
  }
}
