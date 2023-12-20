import Constants from '../../constants/constants';

export default class PathCreate extends Phaser.GameObjects.Container {
    /** @param {import('../../scenes/create').default} scene */
    constructor(scene) {
        super(scene);

        /** @type {Phaser.GameObjects.Image[]} */
        this.pathImages = [];
        /** @type {Phaser.Geom.Point[]} */
        this.points = [];
        this.enabled = false;
        this.clicked = false;
        this.pathTexture = 'path';

        this.scene.add.existing(this);
    }

    enable() {
        this.reset();

        this.enabled = true;

        this.init();
    }

    disable() {
        this.enabled = false;
        this.clicked = false;

        this.points = this.pathImages.map(image => new Phaser.Geom.Point(image.x, image.y));
    }

    init() {
        this.setInteractive(new Phaser.Geom.Rectangle(0, 0, Constants.WIDTH, Constants.HEIGHT), Phaser.Geom.Rectangle.Contains)
            .on(Phaser.Input.Events.POINTER_MOVE, this.onPointerMove, this);
    }

    /** @param {Phaser.Input.Pointer} pointer */
    onPointerMove(pointer) {
        if ((!pointer.isDown || !this.enabled) && this.clicked) {
            this.disable();
        }

        if (!pointer.isDown || !this.enabled) {
            return;
        }

        const image = this.scene.add.image(pointer.x, pointer.y, this.pathTexture);

        this.pathImages.push(image);

        this.add(image);
        
        this.clicked = true;
    };

    reset() {
        this.points = [];

        this.pathImages.forEach(image => image.destroy());
        this.pathImages = [];

        this.disableInteractive();
    }
}