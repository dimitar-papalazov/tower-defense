import TextButton from '../component/button/TextButton';
import color from '../enum/color';
import fontStyle from '../enum/fontStyle';
import LevelCreate from './levelCreate';
import LevelSelect from './levelSelect';
import TowerDefenseScene from './towerDefenseScene';

export default class MainMenu extends TowerDefenseScene {
  static key = 'MainMenu';

  /**
   * @override
   */
  constructor () {
    super({ key: MainMenu.key });
  }

  create () {
    this.createTitle();
    this.createLevelSelect();
    this.createLevelCreate();
  }

  /**
   * Creates the title property, that is a Text game object, representing the game's title.
   */
  createTitle () {
    const x = this.game.scale.width * 0.5;
    const y = this.game.scale.height * 0.25;
    this.title = this.add
      .text(x, y, 'Tower Defense', fontStyle.TITLE)
      .setOrigin(0.5);
  }

  /**
   * Creates the levelSelectButton property, that is a TextButton game object.
   */
  createLevelSelect () {
    this.levelSelectButton = new TextButton({
      scene: this,
      x: this.game.scale.width * 0.5,
      y: this.game.scale.height * 0.5,
      callback: this.levelSelectCallback,
      context: this,
      text: 'Level Select',
      size: '64px',
      color: color.PRIMARY.NUMBER
    });
  }

  /**
   * Transitions to the LevelSelect Scene. Adds it to the Game's SceneManager if not present.
   */
  levelSelectCallback () {
    if (!this.game.scene.getScene(LevelSelect.key)) {
      this.game.scene.add(LevelSelect.key, new LevelSelect());
    }

    this.scene.transition({ target: LevelSelect.key, duration: 0, remove: true });
  }

  /**
   * Creates the levelCreateButton property, that is a TextButton game object.
   */
  createLevelCreate () {
    this.levelCreateButton = new TextButton({
      scene: this,
      x: this.game.scale.width * 0.5,
      y: this.game.scale.height * 0.7,
      callback: this.levelCreateCallback,
      context: this,
      text: 'Level Create',
      size: '64px',
      color: color.PRIMARY.NUMBER
    });
  }

  /**
   * Transitions to the LevelCreate Scene. Adds it to the Game's SceneManager if not present.
   */
  levelCreateCallback () {
    if (!this.game.scene.getScene(LevelCreate.key)) {
      this.game.scene.add(LevelCreate.key, new LevelCreate());
    }

    this.scene.transition({ target: LevelCreate.key, duration: 0, remove: true });
  }
}
