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

        this.resistance = 0.2;
        this.armor = 0.5;
        this.magicResistance = 0;
    }
}