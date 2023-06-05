import Phaser from 'phaser';
import events from '../../enum/events';
import CancelButton from '../button/cancelButton';
import CannonTower from '../units/buildings/cannonTower';
import MagicTower from '../units/buildings/magicTower';
import Tower from '../units/buildings/tower';
import Level from '../../scene/level.js';
import BuildingBackground from '../units/buildings/buildingBackground.js';

export default class TowerPicker extends Phaser.GameObjects.Container {
  /**
   * Create a TowerPicker GameObject that extends Phaser.GameObjects.Container.
   * This Object needs to be used in a Level Scene, so the player can pick & place Buildings.
   * It uses the events: HIDE_TOWER_PICKER & SHOW_TOWER_PICKER.
   * @param {Level} scene 
   */
  constructor (scene) {
    super(scene);
    /**
     * @type {Level}
     */
    this.scene;
    this.createBuildings();
    this.createCancel();
    this.setupEvents();
    this.scene.add.existing(this);
  }

  /**
   * Sets up the events: HIDE_TOWER_PICKER & SHOW_TOWER_PICKER.
   */
  setupEvents () {
    const emitter = this.scene.game.emitter;
    emitter.on(events.HIDE_TOWER_PICKER, this.hideBackgrounds, this);
    emitter.on(events.SHOW_TOWER_PICKER, this.showBackgrounds, this);
  }

  /**
   * Removes the events: HIDE_TOWER_PICKER & SHOW_TOWER_PICKER.
   * Needs to be called before destroying this GameObject.
   */
  removeEvents () {
    const emitter = this.scene.game.emitter;
    emitter.off(events.HIDE_TOWER_PICKER, this.hideBackgrounds, this);
    emitter.off(events.SHOW_TOWER_PICKER, this.showBackgrounds, this);
  }

  /**
   * Hides the BuildingBackgrounds GameObjects
   */
  hideBackgrounds () {
    this.backgrounds.forEach(b => b.setVisible(false));
  }

  /**
   * Shows the BuildingBackgrounds GameObjects
   */
  showBackgrounds () {
    this.backgrounds.forEach(b => b.setVisible(true));
  }

  /**
   * Creates the 3 types of Buildings that are in this game.
   * Also creates the background behind them.
   */
  createBuildings () {
    /**
     * @type {Phaser.GameObjects.Image[]}
     */
    this.backgrounds = [];
    const x = this.scene.game.scale.width * 0.15;
    const y = this.scene.game.scale.height * 0.9;

    for (let i = 0; i < 3; i++) {
      this.backgrounds.push(new BuildingBackground(this.scene, x + 160 * i, y));
    }

    const offset = 160;
    this.tower = new Tower(this.scene, x, y);
    this.magicTower = new MagicTower(this.scene, x + offset, y);
    this.cannonTower = new CannonTower(this.scene, x + offset * 2, y);
    this.add([...this.backgrounds, this.tower, this.magicTower, this.cannonTower]);
  }

  /**
   * Creates the cancel button so the player can cancel the placement of a building.
   */
  createCancel () {
    const x = this.scene.game.scale.width * 0.5;
    const y = this.scene.game.scale.height * 0.9;
    this.cancel = new CancelButton(this.scene, x, y);
    this.cancel.setVisible(false);
  }

  /**
   * @override
   */
  destroy () {
    this.removeEvents();
    super.destroy();
  }
}
