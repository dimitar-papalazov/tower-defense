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
        this.tileSize = Constants.TILE_SIZE;
        this.halfTileSize = Constants.TILE_SIZE * 0.5;
        this.pathTexture = 'path';

        this.addGrass();

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

        const x = Math.round((pointer.x - this.halfTileSize) / this.tileSize) * this.tileSize + this.halfTileSize;
        const y = Math.round((pointer.y - this.halfTileSize) / this.tileSize) * this.tileSize + this.halfTileSize;

        if (this.isLastTile(x, y)) {
            this.clicked = true;

            return;
        }

        const image = this.scene.add.image(x, y, this.pathTexture);

        this.pathImages.push(image);

        this.add(image);

        this.clicked = true;
    }

    /**
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

    reset() {
        this.points = [];

        this.pathImages.forEach(image => image.destroy());
        this.pathImages = [];

        this.disableInteractive();
    }

    addGrass() {
        const maxX = Constants.WIDTH / Constants.TILE_SIZE;
        const maxY = Constants.HEIGHT / Constants.TILE_SIZE;

        for (let i = 0; i < maxX; i++) {
            for (let j = 0; j < maxY; j++) {
                const x = i * Constants.TILE_SIZE + this.halfTileSize;
                const y = j * Constants.TILE_SIZE + this.halfTileSize;

                const grass = this.scene.add.image(x, y, 'grass');

                this.add(grass);
            }
        }
    }
}