import Constants from "../constants/constants";
import TextStyle from "../namespaces/textStyle";
import TowerDefenseScene from "./towerDefenseScene";
import SceneKeys from "../namespaces/sceneKeys";
import Enemy from "../namespaces/enemy";

export default class Loading extends TowerDefenseScene {
    constructor() {
        super({ key: SceneKeys.Loading });
    }

    preload() {
        const text = this.add.text(Constants.WIDTH * 0.5, Constants.HEIGHT * 0.5, 'Loading', TextStyle.TitleSmall)
            .setOrigin(0.5);

        this.load.image('path', 'src/assets/images/path.png');
        this.load.image('grass', 'src/assets/images/grass.png');
        this.load.image('ice', 'src/assets/images/ice.png');
        
        this.load.spritesheet('flame', 'src/assets/spritesheets/flame.png', { frameWidth: 20, frameHeight: 26 });

        this.load.spritesheet(`${Enemy.CREEP}Back`, 'src/assets/spritesheets/creep-back.png', { frameWidth: 15, frameHeight: 17 });
        this.load.spritesheet(`${Enemy.CREEP}Front`, 'src/assets/spritesheets/creep-front.png', { frameWidth: 15, frameHeight: 17 });
        this.load.spritesheet(`${Enemy.CREEP}Side`, 'src/assets/spritesheets/creep-side.png', { frameWidth: 15, frameHeight: 17 });
        
        this.load.spritesheet(`${Enemy.ARMORED_CREEP}Back`, 'src/assets/spritesheets/armored-creep-back.png', { frameWidth: 15, frameHeight: 17 });
        this.load.spritesheet(`${Enemy.ARMORED_CREEP}Front`, 'src/assets/spritesheets/armored-creep-front.png', { frameWidth: 15, frameHeight: 17 });
        this.load.spritesheet(`${Enemy.ARMORED_CREEP}Side`, 'src/assets/spritesheets/armored-creep-side.png', { frameWidth: 15, frameHeight: 17 });
        
        this.load.spritesheet(`${Enemy.ABSORBER_CREEP}Back`, 'src/assets/spritesheets/absorber-creep-back.png', { frameWidth: 15, frameHeight: 17 });
        this.load.spritesheet(`${Enemy.ABSORBER_CREEP}Front`, 'src/assets/spritesheets/absorber-creep-front.png', { frameWidth: 15, frameHeight: 17 });
        this.load.spritesheet(`${Enemy.ABSORBER_CREEP}Side`, 'src/assets/spritesheets/absorber-creep-side.png', { frameWidth: 15, frameHeight: 17 });

        this.load.json('level1', 'src/assets/jsons/level1.json');
        this.load.json('level2', 'src/assets/jsons/level2.json');
        this.load.json('level3', 'src/assets/jsons/level3.json');

        this.load.on(Phaser.Loader.Events.PROGRESS, value => text.setText(`${Math.round(value * 100)}%`));
    }

    create() {
        this.game.levels.push(this.cache.json.get('level1'));
        this.game.levels.push(this.cache.json.get('level2'));
        this.game.levels.push(this.cache.json.get('level3'));

        this.game.switchToScene(SceneKeys.Menu);
    }
}