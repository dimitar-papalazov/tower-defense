import enemyEnum from '../../../enum/enemy.js';
import Enemy from './enemy.js';
import TowerDefenseScene from '../../../scene/towerDefenseScene.js';

export default class ArmoredCreep extends Enemy {
  static TYPE = enemyEnum.ARMORED_CREEP.TYPE;
  static COLOR = enemyEnum.ARMORED_CREEP.COLOR;

  /**
   * @param {TowerDefenseScene} scene
   * @param {number} x
   * @param {number} y
   */
  constructor (scene, x, y) {
    super(scene, x, y);
    this.type = ArmoredCreep.TYPE;
    this.color = ArmoredCreep.COLOR;
    this.setTint(this.color);
  }
}
