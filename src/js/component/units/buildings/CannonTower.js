import building from '../../../enum/building.js'
import color from '../../../enum/color'
import Building from './Building'

export default class CannonTower extends Building {
  static TYPE = building.CANNON_TOWER.TYPE

  constructor (scene, x, y) {
    super(scene, x, y)
    this.type = CannonTower.TYPE
    this.color = color.TURQUOISE.NUMBER
    this.setTint(this.color)
  }
}
