import TextButton from "../components/buttons/textButton";
import Constants from "../constants/constants";
import TextStyle from "../namespaces/textStyle";
import TowerDefenseScene from "./towerDefenseScene";

export default class MainMenu extends TowerDefenseScene {
    static KEY = 'MainMenu';

    constructor() {
        super({ key: MainMenu.KEY });
    }

    create() {
        this.addTitle()
            .addButtons();
    }
    
    addTitle() {
        this.title = this.add.text(Constants.WIDTH * 0.5, Constants.HEIGHT * 0.33, 'TOWER DEFENSE', TextStyle.Title)
            .setOrigin(0.5);

        return this;
    }

    addButtons() {
        this.playButton = new TextButton({
            scene: this,
            text: 'PLAY',
            callback: () => { console.log('play clicked') },
            x: Constants.WIDTH * 0.5,
            y: Constants.HEIGHT * 0.5,
            width: 105,
            height: 45
        });

        this.createButton = new TextButton({
            scene: this,
            text: 'CREATE',
            callback: () => { console.log('create clicked') },
            x: Constants.WIDTH * 0.5,
            y: Constants.HEIGHT * 0.5 + this.playButton.height * 1.5,
            width: 105,
            height: 45
        })

        return this;
    }
}