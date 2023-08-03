import { LoadingScene } from '../scenes/loading/loadingScene.js';

export class TowerDefenseGame extends Phaser.Game {
  constructor () {
    super({ width: 1000, height: 1000, mode: Phaser.Scale.FIT })

    window.game = this;
    this.scene.add(LoadingScene.KEY, new LoadingScene(), true)
    // da se dodaj scena za loadiranje
  }
}