import { TextStyleEnum } from '../../textStyles/textStyle.enum.js';

export class Title extends Phaser.GameObjects.Text {
  /**
   * @param {import("./typedefs/typedefs.js").TitleConfig} config The title configuration settings.
   */
  constructor(config) {
    if (config.style === undefined) config.style = TextStyleEnum.BigTitle;

    super(config.scene, config.x, config.y, config.text, config.style);

    this.setOrigin(0.5);
    this.scene.add.existing(this);
  }
}
