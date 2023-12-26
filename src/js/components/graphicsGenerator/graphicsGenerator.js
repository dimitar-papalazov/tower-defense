import Color from '../../namespaces/color.js';
import './typedefs/graphicsGeneratorConfig.js'

export default class GraphicsGenerator extends Phaser.GameObjects.Graphics {
    /** @param {GraphicsGeneratorConfig} config */
    constructor(config) {
        super(config.scene);

        if (this.scene.textures.exists(config.key)) {
            this.destroy();
        } else {
            const darker = Color.darken(config.color, 0.1, false);
            const lighten = Color.lighten(config.color, 0.1, false);

            this.fillStyle(config.color)
                .fillStyle(config.color)
                .fillRect(0, 0, config.width, config.height)
                .lineStyle(config.lineWidth, darker)
                .lineBetween(0, 0, 0, config.height - config.lineWidth * 0.5) // down
                .lineBetween(0, config.height, config.width, config.height) // left
                .lineStyle(config.lineWidth, lighten)
                .lineBetween(config.lineWidth * 0.5, 0, config.width, 0)
                .lineBetween(config.width, 0, config.width, config.height)
                .generateTexture(config.key, config.width, config.height)
                .destroy();
        }
    }
}