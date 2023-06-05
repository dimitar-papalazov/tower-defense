import enemyEnum from '../../../enum/enemy.js';
import Enemy from './enemy.js';
import TowerDefenseScene from '../../../scene/towerDefenseScene.js';

export default class AbsorberCreep extends Enemy {
  static TYPE = enemyEnum.ABSORBER_CREEP.TYPE;
  static COLOR = enemyEnum.ABSORBER_CREEP.COLOR;

  /**
   * @param {TowerDefenseScene} scene
   * @param {number} x
   * @param {number} y
   */
  constructor (scene, x, y) {
    super(scene, x, y);
    this.type = AbsorberCreep.TYPE;
    this.color = AbsorberCreep.COLOR;
    this.setTint(this.color);
  }
}
