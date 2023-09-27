import { ColorEnum } from '../colors/color.enum.js';

const fontFamily = 'Main';

const FontSize = {
  Small: 20,
  Normal: 51,
  Button: 32,
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
  Button: {
    fontFamily,
    fontSize: FontSize.Button,
    color: ColorEnum.Light.String,
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
