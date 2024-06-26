import Constants from '../../constants/constants';

export default class PathCreate extends Phaser.GameObjects.Container {
    /** @param {import('../../scenes/create').default} scene */
    constructor(scene) {
        super(scene);

        /**
         * @private 
         * @type {Phaser.GameObjects.Image[]} 
         */
        this.pathImages = [];
        /**
         * @private 
         * @type {Phaser.Math.Vector2[]} 
         */
        this.vectors = [];
        /** @private */
        this.enabled = false;
        /** @private */
        this.clicked = false;
        /** @private */
        this.tileSize = Constants.TILE_SIZE;
        /** @private */
        this.halfTileSize = Constants.TILE_SIZE * 0.5;
        /** @private */
        this.pathTexture = 'path';

        this.preview = this.scene.add.image(0, 0, this.pathTexture).setAlpha(0);

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

        this.preview.setAlpha(0);

        this.vectors = this.pathImages.map(image => new Phaser.Math.Vector2(image.x, image.y));
    }

    getVectors() {
        return this.vectors;
    }

    /** @private */
    init() {
        this.setInteractive(new Phaser.Geom.Rectangle(0, 0, Constants.WIDTH, Constants.HEIGHT), Phaser.Geom.Rectangle.Contains)
            .on(Phaser.Input.Events.POINTER_MOVE, this.onPointerMove, this);
    }

    /**
     * @private
     * @param {Phaser.Input.Pointer} pointer 
     */
    onPointerMove(pointer) {
        if (!this.enabled) {
            return;
        }

        const x = Math.round((pointer.x - this.halfTileSize) / this.tileSize) * this.tileSize + this.halfTileSize;
        const y = Math.round((pointer.y - this.halfTileSize) / this.tileSize) * this.tileSize + this.halfTileSize;

        if (!pointer.isDown || !this.enabled) {
            this.preview
                .setAlpha(0.5)
                .setPosition(x, y);

            return;
        }

        if (this.isLastTile(x, y)) {
            this.clicked = true;

            return;
        }

        const image = this.scene.add.image(x, y, this.pathTexture);

        this.pathImages.push(image);

        this.add(image);

        this.checkAdjecency();

        this.clicked = true;
    }

    /** @private */
    checkAdjecency() {
        if (this.pathImages.length < 2) {
            return;
        }

        const lastTile = this.pathImages[this.pathImages.length - 1];
        const secondLastTile = this.pathImages[this.pathImages.length - 2];

        const x = Math.abs(lastTile.x - secondLastTile.x);
        const y = Math.abs(lastTile.y - secondLastTile.y);

        if (x < Constants.TILE_SIZE || y < Constants.TILE_SIZE) {
            return;
        }

        this.addAdjecentTile(lastTile, secondLastTile);
    }


    /** 
     * @private 
     * @param {Phaser.GameObjects.Image} lastTile
     * @param {Phaser.GameObjects.Image} secondLastTile
     */
    addAdjecentTile(lastTile, secondLastTile) {
        const horizontalDifference = lastTile.x - secondLastTile.x;

        let x;
        let y;

        if (horizontalDifference > 0) {
            x = lastTile.x;
            y = secondLastTile.y;
        } else if (horizontalDifference < 0) {
            x = secondLastTile.x;
            y = lastTile.y;
        }

        const image = this.scene.add.image(x, y, this.pathTexture);

        this.pathImages.pop();
        this.pathImages.push(image);
        this.pathImages.push(lastTile);

        this.addAt(image, this.pathImages.length - 2);
    }

    /**
     * @private
     * @param {number} x
     * @param {number} y
     */
    isLastTile(x, y) {
        if (this.pathImages.length === 0) {
            return false;
        }

        const lastTile = this.pathImages[this.pathImages.length - 1];

        return lastTile.x === x && lastTile.y === y
    }

    /** @private */
    reset() {
        this.vectors = [];

        this.pathImages.forEach(image => image.destroy());
        this.pathImages = [];

        this.disableInteractive();
    }
}