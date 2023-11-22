import CreateHeadsUpDisplay from "../components/hud/createHeadsUpDisplay";
import SceneKeys from "../namespaces/sceneKeys";
import TowerDefenseScene from "./towerDefenseScene";

export default class Create extends TowerDefenseScene {
    constructor() {
        super({ key: SceneKeys.Create });
    }

    create() {
        this.hud = new CreateHeadsUpDisplay(this);
    }
}