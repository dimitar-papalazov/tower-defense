import { TowerDefenseScene } from '../towerDefenseScene.js'

export class LoadingScene extends TowerDefenseScene {
  static KEY = 'Loading'

  /**
   * @param {string | Phaser.Types.Scenes.SettingsConfig} config
   */
  constructor (config) {
    super(config);
  }

  preload () {
    this.load.bitmapFont('main', 'src/assets/fonts/pixelFJ8pt1_0.png', 'src/assets/fonts/pixelFJ8pt1.xml')
  }

  create () {
    this.load.start();
  }
}