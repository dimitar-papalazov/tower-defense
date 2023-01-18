import color from '../../../enum/color'
import Building from './Building'

export default class MagicTower extends Building {
  static TYPE = 'MagicTower'

  constructor (scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame)
    this.type = MagicTower.TYPE
    this.damage = 10
    this.penetration = 0
    this.magic = 160
    this.color = color.YELLOW.NUMBER
    this.setTint(this.color)
  }
}
