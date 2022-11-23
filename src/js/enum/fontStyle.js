import color from './color'
// eslint-disable-next-line no-unused-vars
import Phaser from 'phaser'

const FONT_FAMILY = 'Verdana'
export default {
  /**
   * @type {Phaser.GameObjects.TextStyle}
  */
  TITLE: {
    fontFamily: FONT_FAMILY,
    fontSize: '128px',
    color: color.PRIMARY.STRING,
    stroke: color.WHITE.STRING,
    strokeThickness: 8
  },
  /**
   * @type {Phaser.GameObjects.TextStyle}
  */
  BUTTON: {
    color: color.WHITE.STRING,
    fontFamily: FONT_FAMILY
  },
  /**
   * @type {Phaser.GameObjects.TextStyle}
  */
  COUNT: {
    fontFamily: FONT_FAMILY,
    fontSize: '24px',
    color: color.BLACK.STRING
  },
  /**
   * @type {Phaser.GameObjects.TextStyle}
  */
  ROW: {
    fontFamily: FONT_FAMILY,
    fontSize: '32px',
    color: color.BLACK.STRING
  }
}
