import TextButton from '../../component/button/TextButton'
import color from '../../enum/color'
import MainMenu from '../mainMenu'
import TowerDefenseScene from '../towerDefenseScene.js'

export default class Gui extends Phaser.GameObjects.Container {
  /**
   * @param {TowerDefenseScene} scene
   */
  constructor (scene) {
    super(scene)
    /**
     * @type {TowerDefenseScene}
     */
    this.scene
    this.scene.add.existing(this)
    this.game = this.scene.game
    this.components = []
  }

  createBackButton () {
    this.backButton = new TextButton({
      scene: this.scene,
      x: this.game.scale.width * 0.1,
      y: this.game.scale.height * 0.9,
      callback: this.backButtonCallback,
      context: this,
      text: 'Back',
      size: '32px',
      color: color.PRIMARY.NUMBER
    })

    this.components.push(this.backButton)
  }

  backButtonCallback () {
    this.game.scene.add(MainMenu.key, new MainMenu())
    this.scene.scene.transition({ target: MainMenu.key, duration: 0, remove: true })
  }

  hideAllComponents () {
    this.components.forEach(c => { if (c && c.setVisible) c.setVisible(false) })
  }

  showAllComponents () {
    this.components.forEach(c => { if (c && c.setVisible) c.setVisible(true) })
  }

  /**
   * @param {string} name
   */
  hideComponent (name) {
    if (this[name] && this[name].setVisible) this[name].setVisible(false)
  }

  /**
   * @param {string} name
   */
  showComponent (name) {
    if (this[name] && this[name].setVisible) this[name].setVisible(true)
  }
}
