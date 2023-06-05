import building from '../../../enum/building.js';
import color from '../../../enum/color.js';
import Building from './building.js';

export default class MagicTower extends Building {
  static TYPE = building.MAGIC_TOWER.TYPE;

  constructor (scene, x, y) {
    super(scene, x, y);
    this.type = MagicTower.TYPE;
    this.color = color.YELLOW.NUMBER;
    this.setTint(this.color);
  }
}
