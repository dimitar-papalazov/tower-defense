/** @typedef {import('../../scenes/towerDefenseScene').default} TowerDefenseScene */

import Constants from '../../constants/constants.js';
import TextButton from '../buttons/textButton';

export default class HeadsUpDisplay extends Phaser.GameObjects.Container {
    /** @param {TowerDefenseScene} scene */
    constructor(scene) {
        super(scene);
        /** @type {TowerDefenseScene} */
        this.scene;

        this.setDepth(Constants.HUD_DEPTH);

        this.scene.events.on(Phaser.Scenes.Events.ADDED_TO_SCENE, this.onAddedToScene, this);

        this.scene.add.existing(this);
    }

    /** @param {Phaser.GameObjects.GameObject|Phaser.GameObjects.GameObject[]} [except]  */
    hideChildren(except) {
        this.changeVisibility(0, except);
    }

    /** @param {Phaser.GameObjects.GameObject|Phaser.GameObjects.GameObject[]} [except]  */
    showChildren(except) {
        this.changeVisibility(1, except);
    }

    /**
     * @param {number} alpha 
     * @param {Phaser.GameObjects.GameObject|Phaser.GameObjects.GameObject[]} [except]
     */
    changeVisibility(alpha, except) {
        if (!Array.isArray(except)) {
            except = [except].filter(v => v);
        }

        const targets = this.getAll().filter(c => !except.includes(c));

        this.scene.tweens.add({
            targets,
            alpha,
            ease: Phaser.Math.Easing.Expo.In,
            duration: 200
        })
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {string} text
     * @param {Function} callback
     */
    addTextButton(x, y, text, callback) {
        const button = new TextButton({ scene: this.scene, x, y, text, callback, context: this });
        
        this.add(button);
        
        return button;
    }

    /** @protected */
    onAddedToScene() {
        this.scene.children.bringToTop(this);
    }

    /** @param {boolean} [fromScene] */
    destroy(fromScene) {
        this.scene.events.off(Phaser.Scenes.Events.ADDED_TO_SCENE, this.onAddedToScene, this);

        super.destroy(fromScene);
    }
}