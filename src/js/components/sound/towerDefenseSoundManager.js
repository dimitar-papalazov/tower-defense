export default class TowerDefenseSoundManager extends Phaser.Sound.WebAudioSoundManager {
    /** @param {import('../../game/towerDefenseGame.js').default} game */
    constructor(game) {
        super(game);
        /** @type {import('../../game/towerDefenseGame.js').default} */
        this.game;
    }

    playMainTheme() {
        if (this.mainThemeStarted || !this.game.cache.audio.has('main-theme')) {
            return;
        }

        this.play('main-theme', { loop: true, volume: 0.05 });

        this.mainThemeStarted = true;
    }

    playTap() {
        this.play('tap');
    }

    playCoinsReward() {
        this.play('coins-reward', { volume: 0.5 });
    }

    playFireSound() {
        this.play('fire-sound');
    }

    playEnemyKilled() {
        this.play('enemy-killed');
    }

    playFire() {
        this.play('fire', { volume: 0.5, loop: true });
    }

    playIce() {
        this.play('ice', { volume: 0.5, loop: true });
    }

    stopFire() {
        this.stopByKey('fire');
    }

    stopIce() {
        this.stopByKey('ice');
    }

    playError() {
        this.play('error');
    }

    playLoseHeart() {
        this.play('lose-heart');
    }

    playLoseLevel() {
        this.play('lose-level');
    }

    playTicking() {
        this.play('ticking');
    }

    stopTicking() {
        this.stopByKey('ticking');
    }

    playMarch() {
        this.play('marching', { loop: true, volume: 0.1 });
    }

    stopMarch() {
        this.stopByKey('marching');
    }

    playWinSound() {
        this.play('win-sound');
    }

    playTransition() {
        this.play('transition');
    }

    playPopUp() {
        this.play('pop-up');
    }
}