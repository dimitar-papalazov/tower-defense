import Tower from "../../../namespaces/tower.js";
import AbstractTower from "./abstractTower.js";

export default class MagicalTower extends AbstractTower {
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
            type: Tower.MAGIC
        });

        this.damage = {
            physical: 0,
            explosive: 0,
            magic: 10,
        };
    }

    /** @override */
    setAmmunitionTint() {
        this.ammunition.setTint(0x6a31aa);
    }
}