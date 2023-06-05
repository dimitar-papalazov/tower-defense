import TowerDefenseGame from '../game/towerDefenseGame.js';

export default class TowerDefenseScene extends Phaser.Scene {
  /**
   * @param {string|Phaser.Types.Scenes.SettingsConfig} config
   */
  constructor (config) {
    super(config);
    /**
     * @type {TowerDefenseGame}
     */
    this.game;
  }
}
