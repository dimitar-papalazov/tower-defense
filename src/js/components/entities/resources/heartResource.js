import AbstractResource from "./abstractResource.js";
import Resource from '../../../namespaces/resource.js';

export default class HeartResource extends AbstractResource {
    static Events = {
        NO_HEARTS: 'noHearts'
    }
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
            type: Resource.HEART,
            value: 5,
        });
    }

    decrementValue() {
        let value = this.value - 1;

        if (value <= 0) {
            value = 0;

            this.emit(HeartResource.Events.NO_HEARTS);
        }

        this.updateValue(value);
    }
}