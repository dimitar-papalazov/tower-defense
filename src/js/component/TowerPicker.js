import Phaser from 'phaser'
import color from '../enum/color'
import CancelButton from './button/CancelButton'
import CannonTower from './units/buildings/CannonTower'
import MagicTower from './units/buildings/MagicTower'
import Tower from './units/buildings/Tower'

export default class TowerPicker extends Phaser.GameObjects.Container {
  constructor (scene) {
    super(scene)
    this.startingX = this.scene.game.scale.width * 0.15
    this.startingY = this.scene.game.scale.height * 0.9
    this.buildingTexture = 'building'
    this.buildingBackgroundTexture = 'buildingBackground'
    this.xTexture = 'cancel'
    this.createBuildings()
    this.createCancel()
    this.scene.add.existing(this)
  }

  createBuildings () {
    this.generateBuildingGraphic()
    this.generateBuildingBackground()
    const backgrounds = []
    for (let i = 0; i < 3; i++) {
      backgrounds.push(this.scene.add.image(this.startingX + 160 * i, this.startingY, this.buildingBackgroundTexture))
    }
    this.tower = new Tower(this.scene, this.startingX, this.startingY, this.buildingTexture)
    this.magicTower = new MagicTower(this.scene, this.startingX + 160, this.startingY, this.buildingTexture)
    this.cannonTower = new CannonTower(this.scene, this.startingX + 320, this.startingY, this.buildingTexture)
    this.add([...backgrounds, this.tower, this.magicTower, this.cannonTower])
  }

  generateBuildingGraphic () {
    if (this.scene.textures.exists(this.buildingTexture)) return
    const graphics = this.scene.add.graphics()
    graphics.fillStyle(color.WHITE.NUMBER)
    graphics.fillTriangle(0, 80, 80, 80, 40, 0)
    graphics.generateTexture(this.buildingTexture, 80, 80)
    graphics.destroy()
  }

  generateBuildingBackground () {
    if (this.scene.textures.exists(this.buildingBackgroundTexture)) return
    const graphics = this.scene.add.graphics()
    graphics.fillStyle(color.WHITE.NUMBER)
    graphics.fillRoundedRect(0, 0, 100, 100)
    graphics.generateTexture(this.buildingBackgroundTexture, 100, 100)
    graphics.destroy()
  }

  createCancel () {
    this.cancel = new CancelButton(this.scene, this.startingX + 480, this.startingY)
    this.cancel.setVisible(false)
  }
}
