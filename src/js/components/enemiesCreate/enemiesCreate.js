import Constants from '../../constants/constants';
import Color from '../../namespaces/color';
import TextButton from '../buttons/textButton';
import EnemiesRow from './enemiesRow';

export default class EnemiesCreate extends Phaser.GameObjects.Container {
    /** @param {import('../../scenes/create').default} scene */
    constructor(scene) {
        super(scene);
        /** @type {import('../../scenes/create').default} */
        this.scene;
        /** @type {EnemiesRow[]} */
        this.rows = [];

        this.addBackground()
            .addRowsButton()
            .setAlpha(0);

        this.scene.add.existing(this);
    }

    addBackground() {
        this.background = this.scene.add
            .rectangle(Constants.WIDTH * 0.5, Constants.HEIGHT * 0.5, Constants.WIDTH, Constants.HEIGHT, Color.Number.LIGHT)
            .setInteractive();

        return this.add(this.background);
    }

    addRowsButton() {
        this.rowsButton = new TextButton({
            scene: this.scene,
            x: Constants.WIDTH * 0.3,
            y: Constants.HEIGHT * 0.9,
            text: 'Add Row',
            width: 123,
            callback: this.rowsButtonCallback,
            context: this
        })

        return this.add(this.rowsButton);
    }

    rowsButtonCallback() {
        if (this.rows.length === 3) {
            this.scene.sound.playError();
            this.scene.popupManager.addNotification('Cannot add more rows');

            return;
        }

        const enemiesRow = new EnemiesRow(this.scene, Constants.WIDTH * 0.5, Constants.HEIGHT * 0.21 * (this.rows.length + 1));

        this.rows.push(enemiesRow);

        this.add(enemiesRow);
    }

    show() {
        this.scene.tweens.add({
            targets: this,
            alpha: 1,
            ease: Phaser.Math.Easing.Expo.In,
            onComplete: () => this.scene.hud.enemiesButton.text.setText('Save'), // i don't like it
            duration: 200
        })
    }

    hide() {
        this.scene.tweens.add({
            targets: this,
            alpha: 0,
            ease: Phaser.Math.Easing.Expo.In,
            onComplete: () => this.scene.hud.enemiesButton.text.setText('Enemies'), // i don't like it
            duration: 200
        })
    }

    getRows() {
        return this.rows.map(r => r.getRow());
    }
}