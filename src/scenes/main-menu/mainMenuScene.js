import { TowerDefenseScene } from '../towerDefenseScene.js';

export class MainMenuScene extends TowerDefenseScene {
  static KEY = 'MainMenuScene';

  constructor (config) {
    super({ key: MainMenuScene.KEY, ...config });
  }
}