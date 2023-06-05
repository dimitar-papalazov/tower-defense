import LevelCreateGui from './gui/levelCreateGui';
import TowerDefenseScene from './towerDefenseScene.js';

export default class LevelCreate extends TowerDefenseScene {
  static key = 'LevelCreate';

  /**
   * @override
   */
  constructor () {
    super({ key: LevelCreate.key });
  }

  create () {
    this.gui = new LevelCreateGui(this);
  }
}
