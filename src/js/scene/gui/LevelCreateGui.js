import TextButton from '../../component/button/TextButton'
import color from '../../enum/color'
import Gui from './Gui'
import PathCreator from '../../component/creators/PathCreator'
import EnemyCreator from '../../component/creators/enemy-creator/EnemyCreator'
import ToggleButton from '../../component/button/ToggleButton'
import MainMenu from '../MainMenu'

export default class LevelCreateGui extends Gui {
  create () {
    this.components = []
    this.createPathCreatorButton()
    this.createBackButton()
    this.createSaveButton()
    this.createResetPathButton()
    this.createSpecialsButton()
    this.createEnemyCreatorButton()
  }

  createPathCreatorButton () {
    this.createPathCreator()

    this.pathCreatorButton = new TextButton({
      scene: this,
      x: this.game.scale.width * 0.9,
      y: this.game.scale.height * 0.5,
      callback: () => {
        this.pathCreator.enable()
      },
      context: this,
      text: 'Path',
      size: '32px',
      color: color.PRIMARY.NUMBER
    })

    this.components.push(this.pathCreatorButton)
  }

  createPathCreator () {
    this.pathCreator = new PathCreator(this)

    this.pathCreator.addCallbacks({
      enable: {
        callback: () => {
          this.hideAllComponents()
          this.showComponent('pathCreator')
        },
        context: this
      },
      disable: {
        callback: this.showMainButtons,
        context: this
      }
    })

    this.components.push(this.pathCreator)
  }

  createSaveButton () {
    this.saveButton = new TextButton({
      scene: this,
      x: this.game.scale.width * 0.5,
      y: this.game.scale.height * 0.9,
      callback: () => {
        const result = {
          path: this.pathCreator.points,
          enemies: this.enemyCreator.enemies,
          specials: this.specials
        }

        this.game.levels.push(result)
        const mainMenu = new MainMenu(this.game)
        this.game.scene.add(mainMenu.key, mainMenu, true)
        this.game.scene.remove(this)
      },
      context: this,
      text: 'Save',
      size: '32px',
      color: color.PRIMARY.NUMBER
    })

    this.components.push(this.saveButton)
  }

  createResetPathButton () {
    this.resetPathButton = new TextButton({
      scene: this,
      x: this.game.scale.width * 0.85,
      y: this.game.scale.height * 0.9,
      callback: () => {
        this.pathCreator.reset()
      },
      context: this,
      text: 'Reset Path',
      size: '32px',
      color: color.PRIMARY.NUMBER
    })

    this.components.push(this.resetPathButton)
  }

  createEnemyCreatorButton () {
    this.createEnemyCreator()

    this.enemyCreatorButton = new TextButton({
      scene: this,
      x: this.game.scale.width * 0.85,
      y: this.game.scale.height * 0.1,
      callback: () => {
        this.hideAllComponents()
        this.showComponent('enemyCreator')
      },
      context: this,
      text: 'Enemies',
      size: '32px',
      color: color.PRIMARY.NUMBER
    })

    this.components.push(this.enemyCreatorButton)
  }

  createEnemyCreator () {
    this.enemyCreator = new EnemyCreator(this)

    this.enemyCreator.addCloseCallback(this.showMainButtons, this)

    this.components.push(this.enemyCreator)
  }

  createSpecialsButton () {
    this.specials = {
      freeze: false,
      fire: false
    }

    this.createFireSpecialButton()
    this.createFreezeSpecialButton()
    this.specialsEnabled = false

    this.specialsButton = new TextButton({
      scene: this,
      x: this.game.scale.width * 0.1,
      y: this.game.scale.height * 0.1,
      callback: () => {
        if (!this.specialsEnabled) {
          this.hideAllComponents()
          this.showComponent('fireSpecialButton')
          this.showComponent('freezeSpecialButton')
          this.showComponent('specialsButton')
          this.specialsEnabled = true
        } else {
          this.showMainButtons()
          this.specialsEnabled = false
        }
      },
      context: this,
      text: 'Special',
      size: '32px',
      color: color.PRIMARY.NUMBER
    })

    this.components.push(this.specialsButton)
  }

  createFireSpecialButton () {
    this.fireSpecialButton = new ToggleButton({
      scene: this,
      x: this.game.scale.width * 0.33,
      y: this.game.scale.height * 0.5,
      callback: () => {
        this.specials.fire = true
      },
      context: this,
      text: 'Fire',
      size: '64px',
      enableColor: color.PRIMARY.NUMBER,
      disableColor: color.GRAY.NUMBER,
      enabled: false
    })

    this.components.push(this.fireSpecialButton)
    this.hideComponent('fireSpecialButton')
  }

  createFreezeSpecialButton () {
    this.freezeSpecialButton = new ToggleButton({
      scene: this,
      x: this.game.scale.width * 0.67,
      y: this.game.scale.height * 0.5,
      callback: () => {
        this.specials.freeze = true
      },
      context: this,
      text: 'Freeze',
      size: '64px',
      enableColor: color.PRIMARY.NUMBER,
      disableColor: color.GRAY.NUMBER,
      enabled: false
    })

    this.components.push(this.freezeSpecialButton)
    this.hideComponent('freezeSpecialButton')
  }

  showMainButtons () {
    this.hideAllComponents()
    this.showComponent('specialsButton')
    this.showComponent('enemyCreatorButton')
    this.showComponent('pathCreatorButton')
    this.showComponent('resetPathButton')
    this.showComponent('saveButton')
    this.showComponent('backButton')
    this.showComponent('pathCreator')
  }
}
