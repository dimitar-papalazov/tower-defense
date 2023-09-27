import { Title } from '../../components/titles/title.js';
import { TextStyleEnum } from '../../textStyles/textStyle.enum.js';
import { TowerDefenseScene } from '../towerDefenseScene.js';

export class MainMenuScene extends TowerDefenseScene {
  static KEY = 'MainMenuScene';

  constructor(config) {
    super({ key: MainMenuScene.KEY, ...config });
  }

  create() {
    this.title = new Title({
      scene: this,
      x: 500,
      y: 250,
      text: 'Tower Defense',
      style: TextStyleEnum.Title,
    });
  }
}
