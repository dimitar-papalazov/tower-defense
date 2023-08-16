import { ColorEnum } from '../colors/color.enum.js';

const fontFamily = 'Main';

const FontSize = {
  Normal: 20,
  Big: 32,
  SmallTitle: 52,
  NormalTitle: 84,
  BigTitle: 136,
};

export const TextStyleEnum = {
  /** @type {Phaser.Types.GameObjects.Text.TextStyle} */
  NormalText: {
    fontFamily,
    fontSize: FontSize.Normal,
    color: ColorEnum.Light.String,
  },
  /** @type {Phaser.Types.GameObjects.Text.TextStyle} */
  BigText: {
    fontFamily,
    fontSize: FontSize.Big,
    color: ColorEnum.Light.String,
  },
  /** @type {Phaser.Types.GameObjects.Text.TextStyle} */
  SmallTitle: {
    fontFamily,
    fontSize: FontSize.SmallTitle,
    color: ColorEnum.Light.String,
    stroke: ColorEnum.Primary.String,
    strokeThickness: Math.round(FontSize.SmallTitle * 0.1)
  },
  /** @type {Phaser.Types.GameObjects.Text.TextStyle} */
  NormalTitle: {
    fontFamily,
    fontSize: FontSize.NormalTitle,
    color: ColorEnum.Light.String,
    stroke: ColorEnum.Primary.String,
    strokeThickness: Math.round(FontSize.NormalTitle * 0.1)
  },
  /** @type {Phaser.Types.GameObjects.Text.TextStyle} */
  BigTitle: {
    fontFamily,
    fontSize: FontSize.BigTitle,
    color: ColorEnum.Light.String,
    stroke: ColorEnum.Primary.String,
    strokeThickness: Math.round(FontSize.BigTitle * 0.1)
  },
};