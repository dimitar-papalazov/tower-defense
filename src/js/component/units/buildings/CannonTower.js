import color from '../../../enum/color'
import Building from './Building'

export default class CannonTower extends Building {
  static TYPE = 'CannonTower'

  constructor (scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame)
    this.type = CannonTower.TYPE
    this.color = color.TURQUOISE.NUMBER
    this.setTint(this.color)
  }
}
