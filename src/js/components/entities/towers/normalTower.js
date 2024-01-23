import Tower from "../../../namespaces/tower.js";
import AbstractTower from "./abstractTower.js";

export default class NormalTower extends AbstractTower {
    /**
     * @param {import('../../../scenes/level.js').default} scene
     * @param {number} x
     * @param {number} y
     */
    constructor(scene, x, y) {
        super({
            scene,
            x,
            y,
            type: Tower.NORMAL
        });

        this.damage = {
            physical: 10,
            explosive: 0,
            magic: 0,
        };
    }

    /** @override */
    setAmmunitionTint() {
        this.ammunition.setTint(0x819447);
    }
}