import Tower from '../../namespaces/tower.js';
import AbstractTower from '../entities/towers/abstractTower.js';
import CannonTower from '../entities/towers/cannonTower.js';
import MagicalTower from '../entities/towers/magicalTower.js';
import NormalTower from '../entities/towers/normalTower.js';

export default class TowersEmitter extends Phaser.Events.EventEmitter {
    /**
     * @param {import('../../scenes/level.js').default} scene
     * @param {import('../enemiesEmitter/enemiesEmitter.js').default} enemies
     * @param {Phaser.GameObjects.Image[]} path
     */
    constructor(scene, enemies, path) {
        super();

        this.scene = scene;
        this.enemies = enemies;
        this.path = path;
        /** @type {AbstractTower[]} */
        this.towers = [];
        this.towerPicker = this.scene.hud.towerPicker;
        this.placeOnX = null;
        this.placeOnY = null;

        this.setupEvents();

        this.scene.events.on(Phaser.Scenes.Events.DESTROY, this.destroy, this);
    }

    setupEvents() {
        for (const grass of this.scene.grass) {
            grass.setInteractive()
                .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => this.onGrassPointerDown(grass));
        }

        this.towerPicker.on(this.towerPicker.Events.TYPE_SELECT, this.onTowerPickerTypeSelect, this);

    }

    onEnemyMoved() {
        for (const tower of this.towers) {
            const enemy = this.enemies.enemies.find(e => e.active && tower.isInRange(e));
    
            if (enemy) {
                tower.fire(enemy);
            }
        }
    }

    /** @param {Phaser.GameObjects.Image} grass */
    onGrassPointerDown(grass) {
        const { x, y } = grass;

        for (const tower of this.towers) {
            if (tower.x === x && tower.y === y) {
                return;
            }
        }

        for (const tile of this.path) {
            if (tile.x === x && tile.y === y) {
                return;
            }
        }

        this.placeOnX = x;
        this.placeOnY = y;

        this.towerPicker.show();
    }

    /** @param {(typeof Tower)[keyof typeof Tower]} type  */
    onTowerPickerTypeSelect(type) {
        let tower;

        if (type === Tower.NORMAL) {
            tower = new NormalTower(this.scene, this.placeOnX, this.placeOnY);
        } else if (type === Tower.CANNON) {
            tower = new CannonTower(this.scene, this.placeOnX, this.placeOnY);
        } else if (type === Tower.MAGIC) {
            tower = new MagicalTower(this.scene, this.placeOnX, this.placeOnY);
        }

        for (const t of this.towers) {
            if (t.y > tower.y) {
                this.scene.children.moveBelow(tower, t);
            }
        }

        this.towers.push(tower);

        this.placeOnX = null;
        this.placeOnY = null;
    }
}