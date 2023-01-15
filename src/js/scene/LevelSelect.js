import Phaser from 'phaser'
import TextButton from '../component/button/TextButton'
import LevelButton from '../component/button/LevelButton'
import Slider from '../component/Slider'
import color from '../enum/color'
import constants from '../enum/constants'
import fontStyle from '../enum/fontStyle'
// eslint-disable-next-line no-unused-vars
import TowerDefenseGame from '../game/TowerDefenseGame'
import MainMenu from './MainMenu'

export default class LevelSelect extends Phaser.Scene {
  /**
   * @param {TowerDefenseGame} game
   */
  constructor (game) {
    super({ game, key: 'LevelSelect' })
    this.levels = []
  }

  preload () {
    for (let i = 1; i <= constants.LEVELS_IN_JSONS; i++) {
      this.load.json(`level${i}`, `src/assets/json/levels/level${i}.json`)
      this.levels.push(this.cache.json.get(`level${i}`))
    }

    this.levels.push(...this.game.levels)
  }

  create () {
    this.createTitle()
    this.createBackButton()
    this.createSlider()
  }

  createTitle () {
    this.title = this.add.text(this.game.scale.width * 0.5, this.game.scale.height * 0.1, 'Level Select', fontStyle.SMALL_TITLE)
      .setOrigin(0.5)
  }

  createBackButton () {
    this.backButton = new TextButton({
      scene: this,
      x: this.game.scale.width * 0.1,
      y: this.game.scale.height * 0.9,
      callback: () => {
        const mainMenu = new MainMenu(this.game)
        this.game.scene.add(mainMenu.key, mainMenu, true)
        this.game.scene.remove(this)
      },
      context: this,
      text: 'Back',
      size: '32px',
      color: color.PRIMARY.NUMBER
    })
  }

  createSlider () {
    this.slider = new Slider({
      scene: this,
      width: this.game.scale.width * 0.6,
      height: this.game.scale.height * 0.8,
      spaceBetween: 100,
      x: this.game.scale.width * 0.2,
      y: this.game.scale.height * 0.2
    })

    this.addButtons()
  }

  addButtons () {
    const items = []

    for (let i = 1; i <= this.levels.length; i++) {
      items.push(new LevelButton({
        scene: this,
        callback: () => { },
        context: this,
        color: color.PRIMARY.NUMBER,
        size: '32px',
        success: 0,
        text: `Level ${i}`,
        x: 0,
        y: 0
      }))
    }

    this.slider.addItems(items)
  }
}
