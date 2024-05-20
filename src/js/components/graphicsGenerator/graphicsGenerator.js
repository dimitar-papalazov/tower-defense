import Constants from '../../constants/constants.js';
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
        const hasBorder = config.hasBorder ?? true;

        graphics
            .fillStyle(color)
            .fillRect(0, 0, width, height);

        if (hasBorder) {
            graphics
                .lineStyle(Constants.LINE_WIDTH, darker)
                .strokeRect(0, 0, width, height);
        }
            
        graphics
            .generateTexture(config.key, width, height)
            .destroy();
    }
}