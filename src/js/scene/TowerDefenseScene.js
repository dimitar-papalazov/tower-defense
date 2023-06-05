import TowerDefenseGame from '../game/towerDefenseGame.js';

export default class TowerDefenseScene extends Phaser.Scene {
  constructor (config) {
    super(config);
    /**
     * @type {TowerDefenseGame}
     */
    this.game;
  }
}
