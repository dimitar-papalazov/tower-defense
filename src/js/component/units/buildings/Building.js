import Phaser from 'phaser'
import color from '../../../enum/color'
import events from '../../../enum/events'

export default class Building extends Phaser.GameObjects.Sprite {
  static TYPE = 'Building'

  constructor (scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame)
    this.startingX = this.x
    this.startingY = this.y
    this.type = Building.TYPE
    this.range = 200
    this.fireTexture = 'fireTexture'
    this.color = color.WHITE.NUMBER
    this.generateFireTexture()
    this.placed = false
    this.moving = false
    this.clicks = 0
    this.fireStarted = false
    this.emitter = this.scene.game.emitter
    this.enableInput()
    this.setupEvents()
    this.scene.add.existing(this)
  }

  setupEvents () {
    this.emitter.on(events.ENEMY_MOVED, this.fireAnimation, this)
    this.emitter.on(events.BUILDING_START_MOVING, this.onBuildingStartMoving, this)
    this.emitter.on(events.BUILDING_PLACED, this.onBuildingPlaced, this)
  }

  onBuildingStartMoving () {
    if (this.placed) return
    if (!this.moving) this.setVisible(false)
  }

  onBuildingPlaced () {
    if (!this.moving) this.setVisible(true)
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
      this.emitter.emit(events.BUILDING_START_MOVING)
      this.emitter.emit(events.HIDE_TOWER_PICKER)
    }

    if (this.moving && this.clicks === 2) {
      this.setX(this.startingX)
      this.setY(this.startingY)
      this.moving = false
      this.emitter.emit(events.BUILDING_PLACED, Math.round(pointer.x), Math.round(pointer.y), this.type)
      this.clicks = 0
      this.emitter.emit(events.SHOW_TOWER_PICKER)
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
    if (!this.placed) return
    if (Phaser.Math.Distance.Between(this.x, this.y, gameObject.x, gameObject.y) > this.range) return
    if (this.fireStarted) return
    this.fireStarted = true
    const fire = this.scene.add.image(this.x, this.y - this.height * 0.5, this.fireTexture)
    fire.setTint(this.color)

    this.scene.tweens.add({
      targets: [fire],
      duration: 100,
      ease: Phaser.Math.Easing.Linear,
      x: gameObject.x,
      y: gameObject.y,
      onComplete: () => {
        this.fireStarted = false
        this.emitter.emit(events.ENEMY_ATTACKED, gameObject.id, this.type)
        fire.destroy()
      }
    })
  }

  generateFireTexture () {
    if (this.scene.textures.exists(this.fireTexture)) return
    const graphics = this.scene.add.graphics()
    graphics.fillStyle(color.WHITE.NUMBER)
    graphics.fillCircle(10, 10, 10)
    graphics.generateTexture(this.fireTexture, 20, 20)
    graphics.destroy()
  }

  destroy () {
    this.emitter.off(events.ENEMY_MOVED, this.fireAnimation, this)
    this.emitter.off(events.BUILDING_START_MOVING, this.onBuildingStartMoving, this)
    this.emitter.off(events.BUILDING_PLACED, this.onBuildingPlaced, this)
    super.destroy()
  }
}
