import Notification from './notification.js';

export default class PopupManager extends Phaser.Events.EventEmitter {
    static Events = {
        ADD_TO_QUEUE: 'addToQueue',
        POST_POPUP_DESTROY: 'postPopupDestroy',
    }

    /** @param {import('../../scenes/towerDefenseScene.js').default} scene */
    constructor(scene) {
        super();

        this.scene = scene;
        /** @type {import('./popup.js').default[]} */
        this.queue = [];
        this.Events = PopupManager.Events;
        this.activePopup = false;

        this.on(this.Events.ADD_TO_QUEUE, this.onAddToQueue, this)
            .on(this.Events.POST_POPUP_DESTROY, this.onPostPopupDestroy, this);

        this.scene.events.on(Phaser.Scenes.Events.DESTROY, this.destroy, this);
    }

    /** @param {string} text */
    addNotification(text) {
        const notification = new Notification({ scene: this.scene, text });

        this.queue.push(notification);

        notification.once(Phaser.GameObjects.Events.DESTROY, this.onPopupDestroy, this);
        notification.once(Phaser.GameObjects.Events.ADDED_TO_SCENE, this.onNotificationAdded, this);

        this.emit(this.Events.ADD_TO_QUEUE);
    }

    onAddToQueue() {
        if (this.activePopup) {
            return;
        }

        const popup = this.queue.shift();

        if (popup === undefined) {
            return;
        }

        this.activePopup = true;

        this.scene.add.existing(popup);
    }

    /** @param {Notification} notification */
    onNotificationAdded(notification) {
        notification.showAnimation();
    }

    onPopupDestroy() {
        this.activePopup = false;

        this.emit(this.Events.ADD_TO_QUEUE);
    }

    onPostPopupDestroy() {
        const popup = this.queue.shift();

        if (popup === undefined) {
            return;
        }

        this.activePopup = true;

        this.scene.add.existing(popup);
    }
}