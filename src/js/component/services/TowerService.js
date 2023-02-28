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
    this.cancelCounter = 0
    this.canBeBuiltCounter = 0
    this.buildings = []
    this.limit = this.buildings.length + 2
    this.setupEvents()
  }

  setupEvents () {
    this.emitter.on(events.BUILDING_BUILT, this.buildBuilding, this)
    this.emitter.on(events.BUILDING_CANCELED, this.onCanceled, this)
    this.emitter.on(events.CAN_BE_BUILT, this.onCanBeBuilt, this)
  }

  onCanBeBuilt (x, y, type) {
    this.canBeBuiltCounter++
    if (this.canBeBuiltCounter + this.cancelCounter === this.limit) this.buildBuilding(x, y, type)
  }

  onCanceled (x, y, type) {
    this.cancelCounter++
    if (this.canBeBuiltCounter + this.cancelCounter === this.limit) this.buildBuilding(x, y, type)
  }

  buildBuilding (x, y, type) {
    if (this.cancelCounter) {
      this.cancelCounter = 0
      this.canBeBuiltCounter = 0
      return
    }

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
    this.cancelCounter = 0
    this.canBeBuiltCounter = 0
    this.resourceManager.updateResource('coin', -100)
    this.buildings.push(building)
    this.limit = this.buildings.length + 2
  }

  destroy () {
    this.emitter.off(events.BUILDING_BUILT, this.buildBuilding, this)
    this.emitter.off(events.BUILDING_CANCELED, this.onCanceled, this)
    this.emitter.off(events.CAN_BE_BUILT, this.onCanBeBuilt, this)
  }
}
