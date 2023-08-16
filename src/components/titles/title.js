import { TextStyleEnum } from "../../textStyles/textStyle.enum.js";

export class Title extends Phaser.GameObjects.Text {
  /**
   * @param {import("./typedefs/typedefs.js").TitleConfig} config
   */
  constructor(config) {
    if (config.style === undefined) config.style = TextStyleEnum.SmallTitle;

    super(config.scene, config.x, config.y, config.text, config.style);

    this.setOrigin(0.5);
    this.scene.add.existing(this);
  }
}