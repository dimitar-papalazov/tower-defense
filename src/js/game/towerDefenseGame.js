import Constants from "../constants/constants";
import Color from "../namespaces/color";
import Loading from "../scenes/loading";

export default class TowerDefenseGame extends Phaser.Game {
    constructor() {
        super({
            width: Constants.WIDTH,
            height: Constants.HEIGHT,
            autoCenter: Phaser.Scale.Center.CENTER_BOTH,
            backgroundColor: Color.Number.LIGHT
        });

        this.scene.add(Loading.KEY, new Loading(), true);
    }
}