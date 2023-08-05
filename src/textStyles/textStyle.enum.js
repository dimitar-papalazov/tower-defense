const fontFamily = 'Main';

const FontSize = {
  SmallTitle: 50,
  NormalTitle: 64,
  BigTitle: 78,
};

export const TextStyleEnum = {
  /** @type {Phaser.Types.GameObjects.Text.TextStyle} */
  NormalTitle: {
    fontFamily,
    fontSize: FontSize.NormalTitle
  },
  /** @type {Phaser.Types.GameObjects.Text.TextStyle} */
  BigTitle: {
    fontFamily,
    fontSize: FontSize.BigTitle
  },
  /** @type {Phaser.Types.GameObjects.Text.TextStyle} */
  SmallTitle: {
    fontFamily,
    fontSize: FontSize.SmallTitle
  }
};