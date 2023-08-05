import { Title } from '../../components/title/title.js';
import { TextStyleEnum } from '../../textStyles/textStyle.enum.js';
import { TowerDefenseScene } from '../towerDefenseScene.js';

export class MainMenuScene extends TowerDefenseScene {
  static KEY = 'MainMenuScene';

  constructor (config) {
    super({ key: MainMenuScene.KEY, ...config });
  }

  create () {
    this.title = new Title(this, 500, 250, 'Main Menu', TextStyleEnum.BigTitle);
  }
}