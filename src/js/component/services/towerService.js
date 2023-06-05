import events from '../../enum/events';
import CannonTower from '../units/buildings/cannonTower';
import MagicTower from '../units/buildings/magicTower';
import Tower from '../units/buildings/tower';
import Level from '../../scene/level';
import PathUI from '../level/pathUI';
import Building from '../units/buildings/building';
import Enemy from '../units/enemies/enemy';

export default class TowerService {
  /**
   * @param {Level} scene
   * @param {PathUI} pathUI
   */
  constructor (scene, pathUI) {
    /** @type {Level} */
    this.scene = scene;
    /** @type {PathUI} */
    this.pathUI = pathUI;
    this.resourceManager = this.scene.game.resourceManager;
    this.emitter = this.scene.game.emitter;
    this.buildingTexture = 'building';
    this.cancelCounter = 0;
    this.canBeBuiltCounter = 0;
    /**
     * @type {Building[]}
     */
    this.buildings = [];
    this.limit = this.buildings.length + 2;
    this.setupEvents();
  }

  setupEvents () {
    this.emitter.on(events.BUILDING_BUILT, this.buildBuilding, this);
    this.emitter.on(events.BUILDING_CANCELED, this.onCanceled, this);
    this.emitter.on(events.CAN_BE_BUILT, this.onCanBeBuilt, this);
    this.emitter.on(events.BUILDING_PLACED, this.intersects, this);
    this.emitter.on(events.ENEMY_MOVED, this.onEnemyMoved, this);
  }

  /**
   * @param {Enemy} enemy
   */
  onEnemyMoved (enemy) {
    this.buildings.forEach(building => this.buildingAttacksEnemy(building, enemy));
  }

  /**
   * @param {Building} building
   * @param {Enemy} enemy
   */
  buildingAttacksEnemy (building, enemy) {
    if (Phaser.Math.Distance.Between(building.x, building.y, enemy.x, enemy.y) > Building.RANGE) return;

    if (building.isFiring) return;
    building.isFiring = true;

    const fire = this.scene.add.image(building.x, building.y - building.height * 0.5, Building.FIRE_TEXTURE);
    fire.setTint(building.color);

    const onComplete = () => {
      building.isFiring = false;
      this.emitter.emit(events.ENEMY_ATTACKED, enemy.id, building.type);
      fire.destroy();
    };

    this.scene.tweens.add({
      targets: [fire],
      duration: 100,
      ease: Phaser.Math.Easing.Linear,
      x: enemy.x,
      y: enemy.y,
      onComplete
    });
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
    building.disableInteractive();
    this.scene.children.bringToTop(this.scene.gui);
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
    this.checkBuildingIntersects(x, y, type);
    let circle = new Phaser.Geom.Circle(0, 0, 32);
    let triangle = new Phaser.Geom.Triangle(x - 40, y + 40, x + 40, y + 40, x, y - 40);
    let intersects = false;

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

  /**
   * 
   * @param {number} x 
   * @param {number} y 
   * @param {string} type 
   */
  checkBuildingIntersects (x, y, type) {
    const triangle = new Phaser.Geom.Triangle(x - 40, y + 40, x + 40, y + 40, x, y - 40);

    for (const building of this.buildings) {
      const buildingTriangle = new Phaser.Geom.Triangle(
        building.x - 40,
        building.y + 40,
        building.x + 40,
        building.y + 40,
        building.x,
        building.y - 40
      );

      if (Phaser.Geom.Intersects.TriangleToTriangle(buildingTriangle, triangle)) {
        this.emitter.emit(events.BUILDING_CANCELED, x, y, type);
      } else {
        this.emitter.emit(events.CAN_BE_BUILT, x, y, type);
      }
    };
  }

  destroy () {
    this.emitter.off(events.BUILDING_BUILT, this.buildBuilding, this);
    this.emitter.off(events.BUILDING_CANCELED, this.onCanceled, this);
    this.emitter.off(events.CAN_BE_BUILT, this.onCanBeBuilt, this);
    this.emitter.off(events.BUILDING_PLACED, this.intersects, this);
    this.emitter.off(events.ENEMY_MOVED, this.onEnemyMoved, this);
  }
}
