import { ColorEnum } from '../colors/color.enum.js';

const fontFamily = 'Main';

const FontSize = {
  Small: 12,
  Normal: 20,
  SmallTitle: 51,
  Title: 82,
};

export const TextStyleEnum = {
  /** @type {Phaser.Types.GameObjects.Text.TextStyle} */
  SmallText: {
    fontFamily,
    fontSize: FontSize.Small,
    color: ColorEnum.Light.String,
  },
  /** @type {Phaser.Types.GameObjects.Text.TextStyle} */
  Text: {
    fontFamily,
    fontSize: FontSize.Normal,
    color: ColorEnum.Light.String,
  },
  /** @type {Phaser.Types.GameObjects.Text.TextStyle} */
  SmallTitle: {
    fontFamily,
    fontSize: FontSize.SmallTitle,
    color: ColorEnum.Light.String,
    stroke: ColorEnum.Primary.String,
    strokeThickness: Math.round(FontSize.SmallTitle * 0.09),
  },
  /** @type {Phaser.Types.GameObjects.Text.TextStyle} */
  Title: {
    fontFamily,
    fontSize: FontSize.Title,
    color: ColorEnum.Light.String,
    stroke: ColorEnum.Primary.String,
    strokeThickness: Math.round(FontSize.Title * 0.09),
  },
};
