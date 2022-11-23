import TextButton from '../../component/button/TextButton'
import color from '../../enum/color'
import Gui from './Gui'
// eslint-disable-next-line no-unused-vars
import PathCreator from '../../component/creators/PathCreator'
import EnemyCreator from '../../component/creators/enemy-creator/EnemyCreator'

export default class LevelCreateGui extends Gui {
  /**
   * Creates LevelCreateGui
   * @param {object} config LevelCreateGuiConfig
   * @param {Phaser.Game} config.game
   */
  constructor (config) {
    super({
      game: config.game,
      components: {
        backButton: true
      }
    })
  }

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
        callback: () => {
          this.showAllComponents()
          this.hideComponent('enemyCreator')
        },
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
        console.log({
          path: this.pathCreator.points,
          enemies: this.enemyCreator.enemies
        })
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
    this.enemyCreator.addCloseCallback(() => {
      this.showAllComponents()
      this.hideComponent('enemyCreator')
    }, this)
    this.components.push(this.enemyCreator)
  }

  createSpecialsButton () {
    this.specialsButton = new TextButton({
      scene: this,
      x: this.game.scale.width * 0.1,
      y: this.game.scale.height * 0.1,
      callback: () => {
        console.log('specials button clicked')
      },
      context: this,
      text: 'Special',
      size: '32px',
      color: color.PRIMARY.NUMBER
    })

    this.components.push(this.specialsButton)
  }
}
