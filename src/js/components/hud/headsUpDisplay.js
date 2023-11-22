/** @typedef {import('../../scenes/towerDefenseScene').default} TowerDefenseScene */

export default class HeadsUpDisplay extends Phaser.GameObjects.Layer {
    /** @param {TowerDefenseScene} scene */
    constructor(scene) {
        super(scene);
        /** @type {TowerDefenseScene} */
        this.scene;

        this.scene.events.on(Phaser.Scenes.Events.ADDED_TO_SCENE, this.onAddedToScene, this);

        this.scene.add.existing(this);
    }

    /** @param {Phaser.GameObjects.GameObject|Phaser.GameObjects.GameObject[]} [except]  */
    hideChildren(except) {
        this.changeVisibility(false, except);
    }

    /** @param {Phaser.GameObjects.GameObject|Phaser.GameObjects.GameObject[]} [except]  */
    showChildren(except) {
        this.changeVisibility(true, except);
    }

    /**
     * @param {boolean} visible 
     * @param {Phaser.GameObjects.GameObject|Phaser.GameObjects.GameObject[]} [except]
     */
    changeVisibility(visible, except) {
        if (!Array.isArray(except)) {
            except = [except].filter(v => v);
        }

        const children = this.getAll().filter(c => !except.includes(c));

        for (const child of children) {
            child.setVisible(visible);
        }
    }

    /** @protected */
    onAddedToScene() {
        this.scene.children.bringToTop(this);
    }

    /** @param {boolean} fromScene */
    destroy(fromScene) {
        this.scene.events.off(Phaser.Scenes.Events.ADDED_TO_SCENE, this.onAddedToScene, this);

        super.destroy(fromScene);
    }
}