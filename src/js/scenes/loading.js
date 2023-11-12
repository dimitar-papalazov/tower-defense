import Constants from "../constants/constants";
import TextStyle from "../namespaces/textStyle";
import TowerDefenseScene from "./towerDefenseScene";
import MainMenu from "./mainMenu";

export default class Loading extends TowerDefenseScene {
    static KEY = 'Loading';

    constructor() {
        super({ key: Loading.KEY });
    }

    preload() {
        this.add.text(Constants.WIDTH * 0.5, Constants.HEIGHT * 0.5, 'Loading', TextStyle.Loading)
            .setOrigin(0.5);
        // TODO: percent loading
    }

    create() {
        this.scene.add(MainMenu.KEY, new MainMenu());

        this.scene.transition({
            target: MainMenu.KEY,
            duration: 1,
            remove: true
        });
    }
}