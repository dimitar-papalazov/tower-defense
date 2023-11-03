export default class TowerDefenseScene extends Phaser.Scene {
    static KEY = 'TowerDefenseScene';

    /** @param {Phaser.Types.Scenes.SettingsConfig} config */
    constructor(config) {
        super(config);

        /** @type {import('../game/towerDefenseGame.js'.default)} */
        this.game;
    }
}