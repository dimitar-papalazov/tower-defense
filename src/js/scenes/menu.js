import MenuHeadsUpDisplay from "../components/hud/menuHeadsUpDisplay";
import SceneKeys from "../namespaces/sceneKeys";
import TowerDefenseScene from "./towerDefenseScene";

export default class Menu extends TowerDefenseScene {
    constructor() {
        super({ key: SceneKeys.Menu });
    }

    create() {
        this.sound.playMainTheme();

        this.hud = new MenuHeadsUpDisplay(this);
    }
}