import Phaser from 'phaser';
import ResourceManager from '../component/resource/ResourceManager';
import MainMenu from '../scene/mainMenu';
import resources from '../enum/resources';

const gameConfig = {
  type: Phaser.WEBGL,
  width: 1000,
  height: 1000,
  scale: { mode: Phaser.Scale.FIT },
  seed: ['1618']
};

export default class TowerDefenseGame extends Phaser.Game {
  constructor () {
    super(gameConfig);
    Object.defineProperty(window, 'game', { value: this });
    /**
     * @type {LevelConfig[]}
     */
    this.levels = [];
    this.resourceManager = new ResourceManager(this, Object.values(resources));
    this.scene.add(MainMenu.key, new MainMenu(), true);
    this.emitter = new Phaser.Events.EventEmitter();
  }
}
