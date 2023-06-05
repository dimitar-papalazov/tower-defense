import color from './color';
import Phaser from 'phaser';

const FONT_FAMILY = 'Verdana';
export default {
  /**
   * @type {Phaser.Types.GameObjects.Text.TextStyle}
  */
  TITLE: {
    fontFamily: FONT_FAMILY,
    fontSize: '128px',
    color: color.PRIMARY.STRING,
    stroke: color.WHITE.STRING,
    strokeThickness: 8
  },
  /**
   * @type {Phaser.Types.GameObjects.Text.TextStyle}
  */
  SMALL_TITLE: {
    fontFamily: FONT_FAMILY,
    fontSize: '64px',
    color: color.PRIMARY.STRING,
    stroke: color.WHITE.STRING,
    strokeThickness: 4
  },
  /**
   * @type {Phaser.Types.GameObjects.Text.TextStyle}
  */
  BUTTON: {
    color: color.WHITE.STRING,
    fontFamily: FONT_FAMILY
  },
  /**
   * @type {Phaser.Types.GameObjects.Text.TextStyle}
  */
  COUNT: {
    fontFamily: FONT_FAMILY,
    fontSize: '24px',
    color: color.BLACK.STRING
  },
  /**
   * @type {Phaser.Types.GameObjects.Text.TextStyle}
  */
  ROW: {
    fontFamily: FONT_FAMILY,
    fontSize: '32px',
    color: color.BLACK.STRING
  },
  /**
   * @type {Phaser.Types.GameObjects.Text.TextStyle}
  */
  POP_UP_TEXT: {
    fontFamily: FONT_FAMILY,
    fontSize: '32px',
    color: color.WHITE.STRING,
    align: 'center'
  },
  /**
   * @type {Phaser.Types.GameObjects.Text.TextStyle}
  */
  COUNTDOWN: {
    fontFamily: FONT_FAMILY,
    fontSize: '64px',
    color: color.WHITE.STRING,
    align: 'center',
    stroke: color.PRIMARY.STRING,
    strokeThickness: 6
  },
  /**
   * @type {Phaser.Types.GameObjects.Text.TextStyle}
  */
  RESOURCE_UI: {
    fontFamily: FONT_FAMILY,
    fontSize: '32px',
    color: color.WHITE.STRING,
    align: 'center'
  },
  /**
   * @type {Phaser.Types.GameObjects.Text.TextStyle}
  */
  SIGN: {
    fontFamily: FONT_FAMILY,
    fontSize: '64px',
    color: color.WHITE.STRING,
    align: 'center'
  }
};
