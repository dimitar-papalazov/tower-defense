import Constants from '../../constants/constants';
import Color from '../../namespaces/color';
import Enemy from '../../namespaces/enemy';
import GraphicsGenerator from '../graphicsGenerator/graphicsGenerator';
import EnemyTypeCreate from './enemyTypeCreate';

export default class EnemiesRow extends Phaser.GameObjects.Container {
    /** 
     * @param {import('../../scenes/create').default} scene 
     * @param {number} x 
     * @param {number} y 
     */
    constructor(scene, x, y) {
        super(scene, x, y);

        this.width = Constants.WIDTH * 0.8;
        this.height = Constants.HEIGHT * 0.16;
        this.graphicsGenerator = new GraphicsGenerator(this.scene);

        this.addBackground()
            .addCreepType()
            .addArmoredCreepType()
            .addAbsorberCreepType();

        this.scene.add.existing(this);
    }

    addBackground() {
        this.graphicsGenerator.generate({
            color: Color.Number.YELLOW,
            height: this.height,
            key: 'enemies-row-background',
            lineWidth: this.height * 0.12,
            width: this.width
        });

        this.background = this.scene.add.image(0, 0, 'enemies-row-background');

        return this.add(this.background);
    }

    addCreepType() {
        this.creepType = new EnemyTypeCreate(this.scene, this.width * -0.33, 0, Enemy.CREEP);

        return this.add(this.creepType);
    }

    addArmoredCreepType() {
        this.armoredCreepType = new EnemyTypeCreate(this.scene, 0, 0, Enemy.ARMORED_CREEP);

        return this.add(this.armoredCreepType);
    }

    addAbsorberCreepType() {
        this.absorberCreepType = new EnemyTypeCreate(this.scene, this.width * 0.33, 0, Enemy.ABSORBER_CREEP);

        return this.add(this.absorberCreepType);
    }

    getRow() {
        return {
            creep: this.creepType.count,    
            armoredCreep: this.creepType.count,    
            absorberCreep: this.creepType.count,    
        }
    }
}