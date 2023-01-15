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
  SMALL_TITLE: {
    fontFamily: FONT_FAMILY,
    fontSize: '64px',
    color: color.PRIMARY.STRING,
    stroke: color.WHITE.STRING,
    strokeThickness: 4
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
  },
  /**
   * @type {Phaser.GameObjects.TextStyle}
  */
  POP_UP_TEXT: {
    fontFamily: FONT_FAMILY,
    fontSize: '32px',
    color: color.WHITE.STRING,
    align: 'center'
  },
  /**
   * @type {Phaser.GameObjects.TextStyle}
  */
  COUNTDOWN: {
    fontFamily: FONT_FAMILY,
    fontSize: '32px',
    color: color.WHITE.STRING,
    align: 'center'
  },
  /**
   * @type {Phaser.GameObjects.TextStyle}
  */
  RESOURCE_UI: {
    fontFamily: FONT_FAMILY,
    fontSize: '32px',
    color: color.WHITE.STRING,
    align: 'center'
  }
}
