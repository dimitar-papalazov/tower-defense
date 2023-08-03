import Phaser from 'phaser';
import color from '../../enum/color';
import fontStyle from '../../enum/fontStyle';
import Resource from './resource';
import ResourceManager from './resourceManager';
import TowerDefenseScene from '../../scene/towerDefenseScene';

export default class ResourceUI extends Phaser.GameObjects.Container {
  /**
   * @param {Phaser.Scene} scene
   * @param {Resource} resource
   * @param {Number} x
   * @param {Number} y
   */
  constructor (scene, resource, x, y) {
    super(scene);
    /**
     * @type {TowerDefenseScene}
     */
    this.scene;
    this.resource = resource;
    this.positionX = x;
    this.positionY = y;
    this.key = `${resource.name}-ui-background`;
    /**
     * @type {ResourceManager}
     */
    this.resourceManager = this.scene.game.resourceManager;
    this.createBackground();
    this.createIcon();
    this.createValue();
    this.addEvent();
    this.scene.add.existing(this);
  }

  createBackground () {
    if (!this.scene.textures.exists(this.key)) {
      const graphics = this.scene.add.graphics();
      graphics.fillStyle(color.PRIMARY.NUMBER);
      graphics.fillRoundedRect(0, 0, 200, 50);
      graphics.generateTexture(this.key, 200, 50);
      graphics.destroy();
    }

    this.background = this.scene.add.image(this.positionX, this.positionY, this.key);
    this.width = this.background.width;
    this.height = this.background.height;

    this.add(this.background);
  }

  createIcon () {
    this.icon = this.scene.add.image(
      this.positionX - this.width * 0.5,
      this.positionY,
      this.resource.iconKey
    );

    this.icon.setDisplaySize(50, 50);
    this.add(this.icon);
  }

  createValue () {
    this.value = this.scene.add.text(
      this.positionX,
      this.positionY,
      `${this.resource.value}`,
      fontStyle.RESOURCE_UI
    ).setOrigin(0.5);

    this.add(this.value);
  }

  addEvent () {
    this.resourceManager.on(this.resourceManager.events.SAVE_RESOURCE, this.updateValue, this);
  }

  /**
   * @param {ResourceResultConfig} result
   */
  updateValue (result) {
    if (!result || result.id === undefined) return;
    if (result.id !== this.resource.id) return;
    if (result.newValue === result.oldValue) return;

    const onUpdate = () => { this.value.setText(`${Math.round(tween.getValue())}`); };

    const tween = this.scene.tweens.addCounter({
      from: result.oldValue,
      to: result.newValue,
      ease: Phaser.Math.Easing.Cubic.InOut,
      duration: 1600,
      onUpdate
    });

    this.scene.tweens.add({
      targets: [this.icon],
      angle: 360,
      ease: Phaser.Math.Easing.Cubic.InOut,
      duration: 1600
    });
  }

  destroy () {
    this.resourceManager.off(this.resourceManager.events.SAVE_RESOURCE, this.updateValue, this);
    super.destroy();
  }
}
