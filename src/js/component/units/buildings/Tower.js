import color from '../../../enum/color'
import Building from './Building'

export default class Tower extends Building {
  static TYPE = 'Tower'

  constructor (scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame)
    this.type = Tower.TYPE
    this.color = color.MAGENTA.NUMBER
    this.setTint(this.color)
  }
}
