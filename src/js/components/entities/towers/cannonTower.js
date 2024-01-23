import Tower from "../../../namespaces/tower.js";
import AbstractTower from "./abstractTower.js";

export default class CannonTower extends AbstractTower {
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
            type: Tower.CANNON
        });

        this.damage = {
            physical: 0,
            explosive: 10,
            magic: 0,
        };
    }

    /** @override */
    setAmmunitionTint() {
        this.ammunition.setTint(0x2b2b2b);
    }
}