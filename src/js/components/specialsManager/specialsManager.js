import '../../game/typedefs/levelConfig.js';

export default class SpecialsManager {
    /** 
     * @param {import('../../scenes/level.js').default} scene 
     * @param {import('../enemiesEmitter/enemiesEmitter.js').default} enemies 
     * @param {SpecialsConfig} config
     */
    constructor(scene, enemies, config) {
        this.scene = scene;
        this.enemies = enemies;
        this.fireEnabled = config.fire;
        this.iceEnabled = config.ice;
    }

    startFire() {
        if (this.fireStarted) {
            return;
        }

        this.scene.sound.playFire();
        this.fireStarted = true;
        this.fireDamages = 10;

        this.scene.time.addEvent({
            repeat: 10,
            delay: 500,
            callback: this.onFire,
            callbackScope: this
        });
    }

    onFire() {
        this.fireDamages--;

        if (this.fireDamages < 0) {
            this.fireStarted = false;
            this.enemies.stopFire();
            this.scene.sound.stopFire();
        } else {
            this.enemies.startFire();
        }
    }

    startIce() {
        if (this.iceStarted) {
            return;
        }

        this.scene.sound.playIce();
        this.iceStarted = true;
        this.enemies.freeze()

        this.scene.time.delayedCall(5000, () => {
            this.iceStarted = false;
            this.scene.sound.stopIce();
            this.enemies.unfreeze();
        });
    }
}