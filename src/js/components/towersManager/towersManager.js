import Constants from '../../constants/constants.js';
import Color from '../../namespaces/color.js';
import Enemy from '../../namespaces/enemy.js';
import Tower from '../../namespaces/tower.js';
import AbstractTower from '../entities/towers/abstractTower.js';
import CannonTower from '../entities/towers/cannonTower.js';
import MagicalTower from '../entities/towers/magicalTower.js';
import NormalTower from '../entities/towers/normalTower.js';

export default class TowersManager {
    /**
     * @param {import('../../scenes/level.js').default} scene
     * @param {import('../enemiesEmitter/enemiesEmitter.js').default} enemies
     * @param {Phaser.GameObjects.Image[]} path
     */
    constructor(scene, enemies, path) {
        this.scene = scene;
        this.enemies = enemies;
        this.path = path;
        /** @type {AbstractTower[]} */
        this.towers = [];
        this.towerPicker = this.scene.hud.towerPicker;
        this.placeOnX = null;
        this.placeOnY = null;
        this.setupEvents();
    }

    setupEvents() {
        for (const grass of this.scene.grass) {
            grass.setInteractive();
            grass.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => this.onGrassPointerDown(grass));
        }

        this.towerPicker.on(this.towerPicker.Events.TYPE_SELECT, this.onTowerPickerTypeSelect, this);
    }

    start() {
        this.scene.time.addEvent({
            delay: Constants.ENEMY_MOVE_DURATION,
            loop: true,
            callback: this.fire,
            callbackScope: this
        })
    }

    fire() {
        let hasFired = false;

        for (const tower of this.towers) {
            const enemiesInRange = this.enemies.enemies?.filter(e => e.active && tower.isInRange(e));
            let enemy;

            if (tower.type === Tower.CANNON) {
                enemy = enemiesInRange?.find(e => e.type === Enemy.ABSORBER_CREEP);
            } else if (tower.type === Tower.MAGIC) {
                enemy = enemiesInRange?.find(e => e.type === Enemy.ARMORED_CREEP);
            } else if (tower.type === Tower.NORMAL) {
                enemy = enemiesInRange?.find(e => e.type === Enemy.CREEP);
            }

            if (!enemy) {
                enemy = enemiesInRange?.[0];
            }

            if (enemy) {
                hasFired = true;
                tower.fire(enemy);
            }
        }

        if (hasFired) {
            this.scene.sound.playFireSound();
        }
    }

    /** @param {Phaser.GameObjects.Image} grass */
    onGrassPointerDown(grass) {
        this.scene.sound.playTap();
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

        if (!this.scene.hud.coinResource.canBuyTower()) {
            this.scene.sound.playError();
            this.scene.popupManager.addNotification('Not enough coins!');
            return;
        }

        this.placeOnX = x;
        this.placeOnY = y;
        this.markGrass();
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
        this.destroyMark();
        this.placeOnX = null;
        this.placeOnY = null;
        this.scene.hud.coinResource.decreaseValue(Constants.TOWER_COST);
    }

    markGrass() {
        this.destroyMark();
        this.mark = this.scene.add.rectangle(this.placeOnX, this.placeOnY, Constants.TILE_SIZE, Constants.TILE_SIZE, Color.Number.ORANGE, 0.5);
        this.towerPicker.cancelButton.once(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, this.destroyMark, this);
    }

    destroyMark() {
        if (!this.mark) {
            return;
        }

        this.towerPicker.cancelButton.off(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, this.destroyMark, this, true);
        this.mark.destroy();
    }
}