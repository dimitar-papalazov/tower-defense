import TextButton from '../../component/button/TextButton';
import color from '../../enum/color';
import Gui from './gui';
import PathCreator from '../../component/creators/PathCreator';
import EnemyCreator from '../../component/creators/enemy-creator/EnemyCreator';
import ToggleButton from '../../component/button/ToggleButton';
import MainMenu from '../mainMenu';
import LevelCreate from '../levelCreate.js';

export default class LevelCreateGui extends Gui {
  /**
   * @param {LevelCreate} scene
   */
  constructor (scene) {
    super(scene);
    /**
     * @type {Phaser.GameObjects.GameObject[]}
     */
    this.components = [];
    this.createPathCreatorButton();
    this.createBackButton();
    this.createSaveButton();
    this.createResetPathButton();
    this.createSpecialsButton();
    this.createEnemyCreatorButton();
    this.components.forEach(c => { this.add(c); });
  }

  createPathCreatorButton () {
    this.createPathCreator();

    this.pathCreatorButton = new TextButton({
      scene: this.scene,
      x: this.game.scale.width * 0.9,
      y: this.game.scale.height * 0.5,
      callback: this.pathCreator.enable,
      context: this.pathCreator,
      text: 'Path',
      size: '32px',
      color: color.PRIMARY.NUMBER
    });

    this.components.push(this.pathCreatorButton);
  }

  createPathCreator () {
    this.pathCreator = new PathCreator(this.scene);
    const enable = { callback: this.showOnlyPathCreator, context: this };
    const disable = { callback: this.showMainButtons, context: this };
    this.pathCreator.addCallbacks({ enable, disable });
    this.components.push(this.pathCreator);
  }

  showOnlyPathCreator () {
    this.hideAllComponents();
    this.showComponent('pathCreator');
  }

  createSaveButton () {
    this.saveButton = new TextButton({
      scene: this.scene,
      x: this.game.scale.width * 0.5,
      y: this.game.scale.height * 0.9,
      callback: this.saveButtonCallback,
      context: this,
      text: 'Save',
      size: '32px',
      color: color.PRIMARY.NUMBER
    });

    this.components.push(this.saveButton);
  }

  saveButtonCallback () {
    const result = {
      path: this.pathCreator.points,
      enemies: this.enemyCreator.enemies,
      specials: this.specials,
      level: this.game.levels.length
    };

    this.game.levels.push(result);
    this.game.scene.add(MainMenu.key, new MainMenu(), true);
    this.destroy();
  }

  createResetPathButton () {
    this.resetPathButton = new TextButton({
      scene: this.scene,
      x: this.game.scale.width * 0.85,
      y: this.game.scale.height * 0.9,
      callback: this.pathCreator.reset,
      context: this.pathCreator,
      text: 'Reset Path',
      size: '32px',
      color: color.PRIMARY.NUMBER
    });

    this.components.push(this.resetPathButton);
  }

  createEnemyCreatorButton () {
    this.createEnemyCreator();

    this.enemyCreatorButton = new TextButton({
      scene: this.scene,
      x: this.game.scale.width * 0.85,
      y: this.game.scale.height * 0.1,
      callback: this.showOnlyEnemyCreator,
      context: this,
      text: 'Enemies',
      size: '32px',
      color: color.PRIMARY.NUMBER
    });

    this.components.push(this.enemyCreatorButton);
  }

  showOnlyEnemyCreator () {
    this.hideAllComponents();
    this.showComponent('enemyCreator');
  }

  createEnemyCreator () {
    this.enemyCreator = new EnemyCreator(this.scene);
    this.enemyCreator.addCloseCallback(this.showMainButtons, this);
    this.components.push(this.enemyCreator);
  }

  createSpecialsButton () {
    this.specials = {
      freeze: false,
      fire: false
    };

    this.createFireSpecialButton();
    this.createFreezeSpecialButton();
    this.specialsEnabled = false;

    this.specialsButton = new TextButton({
      scene: this.scene,
      x: this.game.scale.width * 0.1,
      y: this.game.scale.height * 0.1,
      callback: this.specialsButtonCallback,
      context: this,
      text: 'Special',
      size: '32px',
      color: color.PRIMARY.NUMBER
    });

    this.components.push(this.specialsButton);
  }

  specialsButtonCallback () {
    if (!this.specialsEnabled) {
      this.hideAllComponents();
      this.showComponent('fireSpecialButton');
      this.showComponent('freezeSpecialButton');
      this.showComponent('specialsButton');
      this.specialsEnabled = true;
    } else {
      this.showMainButtons();
      this.specialsEnabled = false;
    }
  }

  createFireSpecialButton () {
    this.fireSpecialButton = new ToggleButton({
      scene: this.scene,
      x: this.game.scale.width * 0.33,
      y: this.game.scale.height * 0.5,
      callback: this.enableFire,
      context: this,
      text: 'Fire',
      size: '64px',
      enableColor: color.PRIMARY.NUMBER,
      disableColor: color.GRAY.NUMBER,
      enabled: false
    });

    this.components.push(this.fireSpecialButton);
    this.hideComponent('fireSpecialButton');
  }

  enableFire () {
    this.specials.fire = true;
  }

  createFreezeSpecialButton () {
    this.freezeSpecialButton = new ToggleButton({
      scene: this.scene,
      x: this.game.scale.width * 0.67,
      y: this.game.scale.height * 0.5,
      callback: this.enableFreeze,
      context: this,
      text: 'Freeze',
      size: '64px',
      enableColor: color.PRIMARY.NUMBER,
      disableColor: color.GRAY.NUMBER,
      enabled: false
    });

    this.components.push(this.freezeSpecialButton);
    this.hideComponent('freezeSpecialButton');
  }

  enableFreeze () {
    this.specials.freeze = true;
  }

  showMainButtons () {
    this.hideAllComponents();
    this.showComponent('specialsButton');
    this.showComponent('enemyCreatorButton');
    this.showComponent('pathCreatorButton');
    this.showComponent('resetPathButton');
    this.showComponent('saveButton');
    this.showComponent('backButton');
    this.showComponent('pathCreator');
  }
}
