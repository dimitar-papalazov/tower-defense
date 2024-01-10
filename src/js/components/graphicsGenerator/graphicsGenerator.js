import Color from '../../namespaces/color.js';
import './typedefs/graphicsGeneratorConfig.js'

export default class GraphicsGenerator {
    /** @param {import('../../scenes/towerDefenseScene.js').default} scene */
    constructor(scene) {
        this.scene = scene;
    }

    /** @param {GraphicsGeneratorConfig} config */
    generate(config) {
        if (this.scene.textures.exists(config.key)) {
            return;
        }

        const graphics = this.scene.add.graphics();

        const darker = Color.darken(config.color, 0.1, false);
        const lighten = Color.lighten(config.color, 0.1, false);

        graphics.fillStyle(config.color)
            .fillStyle(config.color)
            .fillRect(0, 0, config.width, config.height)
            .lineStyle(config.lineWidth, darker)
            .lineBetween(0, 0, 0, config.height - config.lineWidth * 0.5)
            .lineBetween(0, config.height, config.width, config.height)
            .lineStyle(config.lineWidth, lighten)
            .lineBetween(config.lineWidth * 0.5, 0, config.width, 0)
            .lineBetween(config.width, 0, config.width, config.height)
            .generateTexture(config.key, config.width, config.height)
            .destroy();
    }
}