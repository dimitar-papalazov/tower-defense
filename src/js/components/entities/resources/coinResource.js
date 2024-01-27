import AbstractResource from "./abstractResource.js";
import Resource from '../../../namespaces/resource.js';

export default class CoinResource extends AbstractResource {
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
            type: Resource.COIN,
            value: 1000,
        });
    }
}