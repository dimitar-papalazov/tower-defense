import Enemy from "../../../namespaces/enemy.js"
import AbstractEnemy from "./abstractEnemy.js"

export default class ArmoredCreepEnemy extends AbstractEnemy {
    /**
     * @param {import('../../../scenes/towerDefenseScene.js').default} scene
     * @param {number} x
     * @param {number} y
     */
    constructor(scene, x, y) {
        super({
            scene,
            x,
            y,
            type: Enemy.ARMORED_CREEP
        });

        this.resistance = 0.5;
        this.armor = 1;
        this.magicResistance = 0.3;
    }
}