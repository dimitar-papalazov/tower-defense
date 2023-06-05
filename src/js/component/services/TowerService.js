import events from '../../enum/events';
import CannonTower from '../units/buildings/CannonTower';
import MagicTower from '../units/buildings/MagicTower';
import Tower from '../units/buildings/Tower';

export default class TowerService {
  constructor (scene, pathUI) {
    this.scene = scene;
    this.pathUI = pathUI;
    this.resourceManager = this.scene.game.resourceManager;
    this.emitter = this.scene.game.emitter;
    this.buildingTexture = 'building';
    this.cancelCounter = 0;
    this.canBeBuiltCounter = 0;
    this.buildings = [];
    this.limit = this.buildings.length + 2;
    this.setupEvents();
  }

  setupEvents () {
    this.emitter.on(events.BUILDING_BUILT, this.buildBuilding, this);
    this.emitter.on(events.BUILDING_CANCELED, this.onCanceled, this);
    this.emitter.on(events.CAN_BE_BUILT, this.onCanBeBuilt, this);
    this.emitter.on(events.BUILDING_PLACED, this.intersects, this);
  }

  onCanBeBuilt (x, y, type) {
    this.canBeBuiltCounter++;
    if (this.canBeBuiltCounter + this.cancelCounter === this.limit) this.buildBuilding(x, y, type);
  }

  onCanceled (x, y, type) {
    this.cancelCounter++;
    if (this.canBeBuiltCounter + this.cancelCounter === this.limit) this.buildBuilding(x, y, type);
  }

  buildBuilding (x, y, type) {
    if (this.cancelCounter) {
      this.cancelCounter = 0;
      this.canBeBuiltCounter = 0;
      return;
    }

    if (this.resourceManager.getResource('coin').value - 100 < 0) return;
    let building = null;

    if (type === Tower.TYPE) {
      building = new Tower(this.scene, x, y);
    } else if (type === MagicTower.TYPE) {
      building = new MagicTower(this.scene, x, y);
    } else if (type === CannonTower.TYPE) {
      building = new CannonTower(this.scene, x, y);
    }

    building.placed = true;
    this.cancelCounter = 0;
    this.canBeBuiltCounter = 0;
    this.resourceManager.updateResource('coin', -100);
    this.buildings.push(building);
    this.limit = this.buildings.length + 2;
  }

  /**
   * @param {number} x 
   * @param {number} y 
   * @param {string} type 
   */
  intersects (x, y, type) {
    let circle = new Phaser.Geom.Circle(0, 0, 32);
    let triangle = new Phaser.Geom.Triangle(-40, 40, 40, 40, 0, -40);
    let intersects = false;
    triangle.x1 = x - 40;
    triangle.y1 = y + 40;
    triangle.x2 = x + 40;
    triangle.y2 = y + 40;
    triangle.x3 = x;
    triangle.y3 = y - 40;

    for (const i of this.pathUI.pointsArray) {
      circle.x = i.x;
      circle.y = i.y;
      intersects = Phaser.Geom.Intersects.TriangleToCircle(triangle, circle);
      if (intersects) break;
    }

    if (intersects) this.emitter.emit(events.BUILDING_CANCELED, x, y, type);
    else this.emitter.emit(events.CAN_BE_BUILT, x, y, type);
    circle = null;
    triangle = null;
  }

  destroy () {
    this.emitter.off(events.BUILDING_BUILT, this.buildBuilding, this);
    this.emitter.off(events.BUILDING_CANCELED, this.onCanceled, this);
    this.emitter.off(events.CAN_BE_BUILT, this.onCanBeBuilt, this);
    this.emitter.off(events.BUILDING_PLACED, this.intersects, this);
  }
}
