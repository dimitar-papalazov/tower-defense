import Notification from './notification.js';
import WalkthroughPopup from './walkthroughPopup.js';

export default class PopupManager extends Phaser.Events.EventEmitter {
    static Events = {
        ADD_TO_QUEUE: 'addToQueue',
        QUEUE_END: 'queueEnd',
    }

    /** @param {import('../../scenes/towerDefenseScene.js').default} scene */
    constructor(scene) {
        super();

        this.scene = scene;
        /** @type {import('./popup.js').default[]} */
        this.queue = [];
        this.Events = PopupManager.Events;
        this.activePopup = false;

        this.on(this.Events.ADD_TO_QUEUE, this.onAddToQueue, this);

        this.scene.events.on(Phaser.Scenes.Events.DESTROY, this.destroy, this);
    }

    /** @param {string} text */
    addNotification(text) {
        if (this.queue.some(popup => popup instanceof Notification && popup.text === text)) {
            return;
        }
        const notification = new Notification({ scene: this.scene, text });

        this.queue.push(notification);

        notification.once(Notification.Events.HIDE_FINISH, this.onPopupDestroy, this);
        notification.once(Phaser.GameObjects.Events.ADDED_TO_SCENE, this.onPopupAdded, this);

        this.emit(this.Events.ADD_TO_QUEUE);

        return notification;
    }

    addWalkthroughPopup() {
        const walkthrough = new WalkthroughPopup({ scene: this.scene });

        this.queue.push(walkthrough);

        walkthrough.once(WalkthroughPopup.Events.HIDE_FINISH, this.onPopupDestroy, this);
        walkthrough.once(Phaser.GameObjects.Events.ADDED_TO_SCENE, this.onPopupAdded, this);

        this.emit(this.Events.ADD_TO_QUEUE);

        return walkthrough;
    }

    onAddToQueue() {
        if (this.activePopup) {
            return;
        }
        
        const popup = this.queue.shift();
        
        if (popup === undefined) {
            this.emit(this.Events.QUEUE_END);
            return;
        }

        this.activePopup = true;

        this.scene.add.existing(popup);
    }

    /** @param {import('./popup.js').default} popup */
    onPopupAdded(popup) {
        popup.showAnimation();
    }
    
    onPopupDestroy() {
        this.activePopup = false;

        this.emit(this.Events.ADD_TO_QUEUE);
    }
}