import '../../game/typedefs/levelConfig.js';

export default class SpecialsEmitter extends Phaser.Events.EventEmitter {
    static Events = {
        FIRE: 'fire'
    }

    /** 
     * @param {import('../../scenes/level.js').default} scene 
     * @param {import('../enemiesEmitter/enemiesEmitter.js').default} enemies 
     * @param {SpecialsConfig} config
     */
    constructor(scene, enemies, config) {
        super();

        this.Events = SpecialsEmitter.Events;

        this.scene = scene;
        this.enemies = enemies;
        this.fireEnabled = config.fire;
        this.iceEnabled = config.ice;

        window.specialsEmitter = this;
    }

    startFire() {
        if (this.fireStarted) {
            return;
        }

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
        } else {
            this.enemies.startFire();
        }
    }

    startIce() {
        if (this.iceStarted) {
            return;
        }

        this.iceStarted = true;

        this.enemies.freeze()

        this.scene.time.delayedCall(5000, () => {
            this.iceStarted = false;
            
            this.enemies.unfreeze();
        });
    }
}