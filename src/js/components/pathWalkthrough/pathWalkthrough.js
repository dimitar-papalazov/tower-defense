import TextStyle from '../../namespaces/textStyle.js';
import '../../game/typedefs/levelConfig.js';
import Color from '../../namespaces/color.js';
import Constants from '../../constants/constants.js';

export default class PathWalkthrough {
    /**
     * @param {import('../../scenes/level.js').default} scene 
     * @param {Position[]} positions 
     */
    constructor(scene, positions) {
        /** @private */
        this.scene = scene;
        /** 
         * @private
         * @type {Phaser.GameObjects.Text[]} 
         */
        this.arrows = [];
        /** @private */
        this.shouldTween = false;

        this.addArrows(positions);
    }

    /**
     * @private
     * @param {Position[]} positions 
     */
    addArrows(positions) {
        const positionLength = positions.length;

        for (let i = 0; i < positionLength; i++) {
            const position = positions[i];

            const arrow = this.scene.add.text(position.x, position.y, '>', TextStyle.PathWalkthrough)
                .setOrigin(0.5)
                .setAlpha(0);

            this.arrows.push(arrow);

            const nextPosition = positions[i + 1];

            if (!nextPosition) {
                if (position.y + Constants.TILE_SIZE > Constants.HEIGHT) {
                    arrow.setAngle(90);
                } else if (position.y - Constants.TILE_SIZE < 0) {
                    arrow.setAngle(-90);
                } else if (position.x - Constants.TILE_SIZE < Constants.WIDTH) {
                    arrow.setAngle(180);
                }
            } else {
                if (nextPosition.y > position.y) {
                    arrow.setAngle(90);
                } else if (nextPosition.y < position.y) {
                    arrow.setAngle(-90);
                } else if (nextPosition.x < position.x) {
                    arrow.setAngle(180);
                }
            }
        }
    }

    startTween() {
        this.shouldTween = true;

        this.arrows.forEach((arrow, i) => {
            this.scene.tweens.add({
                targets: arrow,
                ease: Phaser.Math.Easing.Linear,
                duration: 200,
                yoyo: true,
                alpha: 1,
                delay: i * 20,
                onComplete: () => {
                    if (i === this.arrows.length - 1 && this.shouldTween) {
                        this.startTween();
                    }
                }
            });

        })

        return this;
    }

    stopTween() {
        this.shouldTween = false;

        return this;
    }
}