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
        const color = config.color;
        const width = config.width;
        const height = config.height;
        const darker = Color.darken(color, 50, false);
        let lineWidth; 

        if (width > height) {
            lineWidth = Math.floor(height * 0.05);
        } else {
            lineWidth = Math.floor(width * 0.05);
        }

        lineWidth = Phaser.Math.Clamp(lineWidth, 1, 5);

        graphics
            .fillStyle(color)
            .fillRect(0, 0, width, height)
            .lineStyle(lineWidth, darker)
            .strokeRect(0, 0, width, height)
            .generateTexture(config.key, width, height)
            .destroy();
    }
}