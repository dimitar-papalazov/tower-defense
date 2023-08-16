import { Title } from '../../components/titles/title.js';
import { MainMenuScene } from '../main-menu/mainMenuScene.js';
import { TowerDefenseScene } from '../towerDefenseScene.js';

export class LoadingScene extends TowerDefenseScene {
  static KEY = 'LoadingScene';

  /**
   * @param {string | Phaser.Types.Scenes.SettingsConfig} config
   */
  constructor(config) {
    super({ key: LoadingScene.KEY, ...config });
  }

  create() {
    this.addTitle();
    this.addLoadListeners();

    this.load.start();
  }

  /**
   * Adds listeners to LoaderPlugin's events, for animation purpose and 
   * transitioning to MainMenuScene.
   */
  addLoadListeners() {
    this.load.on(Phaser.Loader.Events.PROGRESS, () => {
      this.dots++;

      if (this.dots === 4) this.dots = 1;

      let dotsText = '';

      for (let i = 0; i < this.dots; i++) {
        dotsText += '.';
      }

      this.title.setText(`Loading${dotsText}`);
    });

    this.load.once(Phaser.Loader.Events.COMPLETE, () => {
      this.scene.add(MainMenuScene.KEY, new MainMenuScene());

      this.scene.transition({
        target: MainMenuScene.KEY,
        duration: 0,
        remove: true,
        allowInput: false
      });
    });
  }

  /**
   * Adds a Title GameObject.
   * Initializes dots property.
   */
  addTitle() {
    this.title = new Title({ scene: this, x: 500, y: 500, text: 'Loading' });
    this.dots = 0;
  }
}