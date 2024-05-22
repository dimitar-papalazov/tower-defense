import Enemy from "../../../namespaces/enemy.js"
import AbstractEnemy from "./abstractEnemy.js"

export default class CreepEnemy extends AbstractEnemy {
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
            type: Enemy.CREEP
        });

        this.resistance = 0;
        this.armor = 0.2;
        this.magicResistance = 0.2;
    }
}