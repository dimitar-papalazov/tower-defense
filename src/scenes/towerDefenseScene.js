import { TowerDefenseGame } from '../game/towerDefenseGame.js';

export class TowerDefenseScene extends Phaser.Scene {
  /**
   * @type {string} A unique key used to reference the Scene.
   */
  static KEY;

  /**
   * @param {string | Phaser.Types.Scenes.SettingsConfig} config
   */
  constructor (config) {
    super({ key: TowerDefenseScene.KEY, ...config });
    /**
     * A reference to the Phaser.Game instance.
     * 
     * This property will only be available if defined in the Scene Injection Map.
     *
     * @type {TowerDefenseGame} Type declared for IntelliSense purpose only.
     */
    this.game;
  }
}