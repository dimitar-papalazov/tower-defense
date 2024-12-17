import Constants from "../constants/constants";
import TextStyle from "../namespaces/textStyle";
import TowerDefenseScene from "./towerDefenseScene";
import SceneKeys from "../namespaces/sceneKeys";
import Enemy from "../namespaces/enemy";
import Tower from "../namespaces/tower.js";
import Resource from "../namespaces/resource.js";
import GraphicsGenerator from "../components/graphicsGenerator/graphicsGenerator.js";
import Color from "../namespaces/color.js";

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
        this.load.image(Resource.COIN, 'src/assets/images/coin.png');
        this.load.image(Resource.HEART, 'src/assets/images/heart.png');

        this.load.image('ammunition', 'src/assets/images/ammunition.png');

        this.load.image(Tower.NORMAL, 'src/assets/images/normal-tower.png');
        this.load.image(Tower.CANNON, 'src/assets/images/cannon-tower.png');
        this.load.image(Tower.MAGIC, 'src/assets/images/magic-tower.png');

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

        this.load.audio('main-theme', 'src/assets/audio/main-theme.mp3');
        this.load.audio('tap', 'src/assets/audio/tap.mp3');
        this.load.audio('coins-reward', 'src/assets/audio/coins-reward.mp3');
        this.load.audio('fire-sound', 'src/assets/audio/fire-sound.mp3');
        this.load.audio('enemy-killed', 'src/assets/audio/enemy-killed.mp3');
        this.load.audio('ice', 'src/assets/audio/ice.mp3');
        this.load.audio('fire', 'src/assets/audio/fire.mp3');
        this.load.audio('error', 'src/assets/audio/error.mp3');
        this.load.audio('lose-heart', 'src/assets/audio/lose-heart.mp3');
        this.load.audio('lose-level', 'src/assets/audio/lose-level.mp3');
        this.load.audio('ticking', 'src/assets/audio/ticking.mp3');
        this.load.audio('step-1', 'src/assets/audio/step-1.mp3');
        this.load.audio('step-2', 'src/assets/audio/step-2.mp3');
        this.load.audio('win-sound', 'src/assets/audio/win-sound.mp3');
        this.load.audio('transition', 'src/assets/audio/transition.mp3');
        this.load.audio('pop-up', 'src/assets/audio/pop-up.mp3');
        this.load.audio('marching', 'src/assets/audio/marching.mp3');

        this.load.on(Phaser.Loader.Events.PROGRESS, value => text.setText(`${Math.round(value * 100)}%`));
    }

    create() {
        this.game.levels.push(this.cache.json.get('level1'));
        this.game.levels.push(this.cache.json.get('level2'));
        this.game.levels.push(this.cache.json.get('level3'));

        this.game.switchToScene(SceneKeys.Menu, {}, false);
    }
}