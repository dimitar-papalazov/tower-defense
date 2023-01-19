import events from '../../enum/events'
import CannonTower from '../units/buildings/CannonTower'
import MagicTower from '../units/buildings/MagicTower'
import Tower from '../units/buildings/Tower'

export default class TowerService {
  constructor (scene) {
    this.scene = scene
    this.resourceManager = this.scene.game.resourceManager
    this.emitter = this.scene.game.emitter
    this.buildingTexture = 'building'
    this.buildings = []
    this.setupEvents()
  }

  setupEvents () {
    this.emitter.on(events.BUILDING_PLACED, this.placeBuilding, this)
  }

  placeBuilding (x, y, type) {
    if (this.resourceManager.getResource('coin').value - 100 < 0) return
    let building = null

    if (type === Tower.TYPE) {
      building = new Tower(this.scene, x, y, this.buildingTexture)
    } else if (type === MagicTower.TYPE) {
      building = new MagicTower(this.scene, x, y, this.buildingTexture)
    } else if (type === CannonTower.TYPE) {
      building = new CannonTower(this.scene, x, y, this.buildingTexture)
    }

    building.placed = true
    this.resourceManager.updateResource('coin', -100)
    this.buildings.push(building)
  }

  destroy () {
    this.emitter.off(events.BUILDING_PLACED, this.placeBuilding, this)
  }
}
