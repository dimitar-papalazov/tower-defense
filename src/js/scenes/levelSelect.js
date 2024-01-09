import LevelSelectHeadsUpDisplay from "../components/hud/levelSelectHeadsUpDisplay.js";
import SceneKeys from "../namespaces/sceneKeys.js";
import TowerDefenseScene from "./towerDefenseScene.js";

export default class LevelSelect extends TowerDefenseScene {
    constructor() {
        super({ key: SceneKeys.LevelSelect });
    }

    create() {
        this.hud = new LevelSelectHeadsUpDisplay(this);
    }
}