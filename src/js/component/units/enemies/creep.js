import enemyEnum from '../../../enum/enemy.js';
import Enemy from './enemy.js';
import TowerDefenseScene from '../../../scene/towerDefenseScene.js';

export default class Creep extends Enemy {
  static TYPE = enemyEnum.CREEP.TYPE;
  static COLOR = enemyEnum.CREEP.COLOR;

  /**
   * @param {TowerDefenseScene} scene
   * @param {number} x
   * @param {number} y
   */
  constructor (scene, x, y) {
    super(scene, x, y);
    this.type = Creep.TYPE;
    this.color = Creep.COLOR;
    this.setTint(this.color);
  }
}
