import color from '../../enum/color'
import enemy from '../../enum/enemy'
import PopUp from './PopUp'
import Phaser from 'phaser'

export default class IntroPopUp extends PopUp {
  static shouldShow (level) {
    return level === 1
  }

  constructor (scene, onClose, onCloseContext) {
    super(scene, 750, 500)
    this.onClose = onClose
    this.onCloseContext = onCloseContext
    this.initItems()
    this.open()
    this.off(Phaser.Input.Events.POINTER_DOWN, this.tweenOut, this)
  }

  initItems () {
    this.initBackgrounds()
    this.initBuildings()
    this.initEnemies()
    this.initText()
  }

  initEnemies () {
    this.addItem(this.scene.add.image(this.gameCenterX + 250, this.gameCenterY - 150, enemy.CREEP.TEXTURE).setScale(0.5))
    this.addItem(this.scene.add.image(this.gameCenterX + 250, this.gameCenterY, enemy.ABSORBER_CREEP.TEXTURE).setScale(0.5))
    this.addItem(this.scene.add.image(this.gameCenterX + 250, this.gameCenterY + 150, enemy.ARMORED_CREEP.TEXTURE).setScale(0.5))
  }

  initBuildings () {
    this.addItem(this.scene.add.image(this.gameCenterX - 250, this.gameCenterY - 150, 'building').setTint(color.MAGENTA.NUMBER))
    this.addItem(this.scene.add.image(this.gameCenterX - 250, this.gameCenterY, 'building').setTint(color.YELLOW.NUMBER))
    this.addItem(this.scene.add.image(this.gameCenterX - 250, this.gameCenterY + 150, 'building').setTint(color.TURQUOISE.NUMBER))
  }

  initBackgrounds () {
    this.addItem(this.scene.add.image(this.gameCenterX - 250, this.gameCenterY - 150, 'buildingBackground'))
    this.addItem(this.scene.add.image(this.gameCenterX - 250, this.gameCenterY, 'buildingBackground'))
    this.addItem(this.scene.add.image(this.gameCenterX - 250, this.gameCenterY + 150, 'buildingBackground'))
    this.addItem(this.scene.add.image(this.gameCenterX + 250, this.gameCenterY - 150, 'buildingBackground'))
    this.addItem(this.scene.add.image(this.gameCenterX + 250, this.gameCenterY, 'buildingBackground'))
    this.addItem(this.scene.add.image(this.gameCenterX + 250, this.gameCenterY + 150, 'buildingBackground'))
  }

  initText () {
    this.addText(this.gameCenterX, this.gameCenterY - 150, 'best against')
    this.addText(this.gameCenterX, this.gameCenterY, 'best against')
    this.addText(this.gameCenterX, this.gameCenterY + 150, 'best against')
  }

  close () {
    super.close(this.onClose, this.onCloseContext)
  }
}
