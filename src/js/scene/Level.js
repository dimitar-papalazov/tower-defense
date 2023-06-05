import PathUI from '../component/level/pathUI';
import EnemyService from '../component/services/EnemyService';
import TowerService from '../component/services/TowerService';
import fontStyle from '../enum/fontStyle';
import LevelGui from './gui/levelGui.js';
import TowerDefenseScene from './towerDefenseScene.js';

export default class Level extends TowerDefenseScene {
  static key = 'Level';

  /**
   * @param {LevelConfig} config
   */
  constructor (config) {
    super({ key: Level.key });
    this.path = config.path;
    this.enemies = [...config.enemies];
    this.specials = config.specials;
    this.level = config.level;
  }

  create () {
    this.gui = new LevelGui(this);
    this.pathUI = new PathUI(this, this.path);
    this.createPathSigns();
    this.enemyService = new EnemyService(this, this.enemies, this.path);
    this.towerService = new TowerService(this, this.pathUI);
    this.children.bringToTop(this.gui);
  }

  /**
   * Creates startSign and endSign properties, that are Text, representing start and end of the path.
   */
  createPathSigns () {
    this.startSign = this.createSign(this.path[0], 'START');
    this.endSign = this.createSign(this.path[this.path.length - 1], 'END');
  }

  /**
   * Creates a Text on the provided point, with provided text.
   * @param {PointConfig} point
   * @param {String} text
   */
  createSign (point, text) {
    const { originX, originY } = this.calculateOrigin(point.x, point.y);
    return this.add
      .text(point.x, point.y, text, fontStyle.SIGN)
      .setOrigin(originX, originY);
  }

  /**
   * Calculates the origin of a text from the provided x and y values.
   * @param {Number} x
   * @param {Number} y
   */
  calculateOrigin (x, y) {
    let isVertical = true;
    let originX = 0.5;
    let originY = 0.5;
    if (x < 100) originX = 0;
    else if (x > 900) originX = 1;
    if (originX !== 0.5) isVertical = false;

    if (isVertical) {
      if (y < 100) originY = 0;
      else if (y > 900) originY = 1;
    }

    return { originX, originY };
  }

  /**
   * Removes the start & end Text signs.
   */
  removeSigns () {
    if (this.signsRemoved) return;
    this.signsRemoved = true;
    this.startSign.destroy();
    this.endSign.destroy();
  }
}
