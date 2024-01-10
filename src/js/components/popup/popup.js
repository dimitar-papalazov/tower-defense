import './typedefs/popupConfigs.js';
import GraphicsGenerator from '../graphicsGenerator/graphicsGenerator.js';


export default class Popup extends Phaser.GameObjects.Container {
    /** @param {PopupConfig} config */
    constructor(config) {
        super(config.scene, config.x, config.y);

        this.graphicsGenerator = new GraphicsGenerator(this.scene);
    }
    
}