import { LoadingScene } from '../scenes/loading/loadingScene.js';

export class TowerDefenseGame extends Phaser.Game {
  constructor() {
    super({
      width: 1000,
      height: 1000,
      scale: { mode: Phaser.Scale.FIT },
      pixelArt: true,
    });

    window.game = this;
    this.scene.add(LoadingScene.KEY, new LoadingScene(), true);
  }
}
