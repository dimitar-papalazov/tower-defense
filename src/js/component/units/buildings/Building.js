import Phaser from 'phaser'
import color from '../../../enum/color'

export default class Building extends Phaser.GameObjects.Sprite {
  static TYPE = 'Building'

  constructor (scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame)
    this.startingX = this.x
    this.startingY = this.y
    this.type = Building.TYPE
    this.damage = 0
    this.penetration = 0
    this.magic = 0
    this.range = 200
    this.fireTexture = 'fireTexture'
    this.color = color.WHITE.NUMBER
    this.generateFireTexture()
    this.placed = false
    this.moving = false
    this.clicks = 0
    this.enableInput()
  }

  enableInput () {
    this.setInteractive()
    this.on(Phaser.Input.Events.POINTER_DOWN, this.onPointerDown, this)
    this.on(Phaser.Input.Events.POINTER_MOVE, this.onPointerMove, this)
  }

  onPointerDown (pointer) {
    this.clicks++

    if (!this.placed && this.clicks === 1) {
      this.moving = true
      this.setX(pointer.x)
      this.setY(pointer.y)
    }

    if (this.moving && this.clicks === 2) {
      this.setX(this.startingX)
      this.setY(this.startingY)
      this.moving = false
      this.scene.game.events.emit('buildingPlaced', Math.round(pointer.x), Math.round(pointer.y), this.type)
      this.clicks = 0
    }
  }

  onPointerMove (pointer) {
    if (!this.moving) return
    this.setX(pointer.x)
    this.setY(pointer.y)
  }

  toString () {
    return JSON.stringify({
      type: this.type,
      damage: this.damage,
      penetration: this.penetration,
      magic: this.magic
    })
  }

  fireAnimation (gameObject) {
    const fire = this.scene.add.image(this.x, this.y, this.fireTexture)
    fire.setTint(this.color)

    this.scene.tweens.add({
      targets: [fire],
      duration: 300,
      ease: Phaser.Math.Easing.Linear,
      x: gameObject.x,
      y: gameObject.y,
      onComplete: () => {
        fire.destroy()
        // ovde mozi nekogas ke treba event da se emitira
      }
    })
  }

  generateFireTexture () {
    if (this.scene.textures.exists(this.fireTexture)) return

    const graphics = this.scene.add.graphics()
    graphics.fillStyle(color.WHITE.NUMBER)
    graphics.fillCircle(0, 0, 30)
    graphics.generateTexture(this.fireTexture, 60, 60)
    graphics.destroy()
  }
}
