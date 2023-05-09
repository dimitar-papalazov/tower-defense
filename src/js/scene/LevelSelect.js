import TextButton from '../component/button/TextButton'
import LevelButton from '../component/button/LevelButton'
import Slider from '../component/Slider'
import color from '../enum/color'
import constants from '../enum/constants'
import fontStyle from '../enum/fontStyle'
import MainMenu from './mainMenu'
import Level from './level'
import LevelGui from './gui/LevelGui'
import TowerDefenseScene from './TowerDefenseScene.js'

export default class LevelSelect extends TowerDefenseScene {
  static key = 'LevelSelect'

  /**
   * @override
   */
  constructor () {
    super({ key: LevelSelect.key })
    this.levels = []
  }

  /**
   * @override
   * Loads all levels' JSONs.
   */
  preload () {
    for (let i = 1; i <= constants.LEVELS_IN_JSONS; i++) {
      this.load.json(`level${i}`, `src/assets/json/levels/level${i}.json`)
    }
  }

  /**
   * @override
   * Creates the game objects in this Scene, also gets the loaded levels' JSONs.
   */
  create () {
    for (let i = 1; i <= constants.LEVELS_IN_JSONS; i++) {
      this.levels.push(this.cache.json.get(`level${i}`))
    }

    this.levels.push(...this.game.levels)
    this.createTitle()
    this.createBackButton()
    this.createSlider()
  }

  /**
   * Creates the title property, that is Text, that represents this Scene's title.
   */
  createTitle () {
    this.title = this.add
      .text(this.game.scale.width * 0.5, this.game.scale.height * 0.1, 'Level Select', fontStyle.SMALL_TITLE)
      .setOrigin(0.5)
  }

  /**
   * Creates the backButton property, that is TextButton.
   */
  createBackButton () {
    this.backButton = new TextButton({
      scene: this,
      x: this.game.scale.width * 0.1,
      y: this.game.scale.height * 0.9,
      callback: this.backButtonCallback,
      context: this,
      text: 'Back',
      size: '32px',
      color: color.PRIMARY.NUMBER
    })
  }

  /**
   * Adds the MainMenu Scene to the SceneManager if not present and transitions to it.
   */
  backButtonCallback () {
    if (!this.game.scene.getScene(MainMenu.key)) this.game.scene.add(MainMenu.key, new MainMenu(this.game))
    this.scene.transition({ target: MainMenu.key, duration: 0, remove: true })
  }

  /**
   * Creates the slider property, that is instance of Slider.
   */
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

  /**
   * Creates and adds LevelButtons to the slider.
   */
  addButtons () {
    const items = []

    for (let i = 1; i <= this.levels.length; i++) {
      items.push(new LevelButton({
        scene: this,
        params: [i],
        callback: this.levelButtonCallback,
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

  /**
   * Opens Level Scene.
   * The config for the level will be determined by the provided index of the level.
   * @param {Number} index
   */
  levelButtonCallback (index) {
    this.levels[index - 1].level = index
    // Delete after GUI refactor
    const levelGui = new LevelGui(this.game)
    this.game.scene.add(Level.key, new Level(levelGui, this.levels[index - 1]))
    this.game.scene.add(levelGui.key, levelGui, true)
    this.game.scene.bringToTop(levelGui)
    this.scene.transition({ target: Level.key, duration: 0, remove: true })
  }
}
