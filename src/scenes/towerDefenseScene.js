import { TowerDefenseGame } from '../game/towerDefenseGame.js';

export class TowerDefenseScene extends Phaser.Scene {
  static KEY;

  /**
   * @param {string | Phaser.Types.Scenes.SettingsConfig} config
   */
  constructor (config) {
    super(config);
    /**
     * @type {TowerDefenseGame}
     */
    this.game;
  }
}