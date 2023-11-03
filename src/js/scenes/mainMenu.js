import Constants from "../constants/constants";
import TextStyle from "../enum/textStyle";
import TowerDefenseScene from "./TowerDefenseScene";

export default class MainMenu extends TowerDefenseScene {
    static KEY = 'MainMenu';

    constructor() {
        super({
            key: MainMenu.KEY,
        });
    }

    create() {
        this.addTitle();
    }
    
    addTitle() {
        this.title = this.add.text(Constants.WIDTH * 0.5, Constants.HEIGHT * 0.33, 'Tower Defense', TextStyle.Title)
            .setOrigin(0.5);

        return this;
    }
}