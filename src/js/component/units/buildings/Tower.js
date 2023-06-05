import color from '../../../enum/color';
import building from '../../../enum/building.js';
import Building from './Building';

export default class Tower extends Building {
  static TYPE = building.TOWER.TYPE;

  constructor (scene, x, y) {
    super(scene, x, y);
    this.type = Tower.TYPE;
    this.color = color.MAGENTA.NUMBER;
    this.setTint(this.color);
  }
}
