import Phaser from 'phaser'
import TextButton from '../component/button/TextButton'
import color from '../enum/color'
import fontStyle from '../enum/fontStyle'
import LevelCreate from './LevelCreate'

export default class MainMenu extends Phaser.Scene {
  constructor (game) {
    super({
      game,
      key: 'MainMenu'
    })
  }

  create () {
    this.createTitle()
    this.createLevelSelect()
    this.createLevelCreate()
  }

  createTitle () {
    this.title = this.add.text(this.game.scale.width * 0.5, this.game.scale.height * 0.25, 'Tower Defense', fontStyle.TITLE)
      .setOrigin(0.5)
  }

  createLevelSelect () {
    this.levelSelectButton = new TextButton({
      scene: this,
      x: this.game.scale.width * 0.5,
      y: this.game.scale.height * 0.5,
      callback: () => { console.log('Level Select Clicked') },
      context: this,
      text: 'Level Select',
      size: '64px',
      color: color.PRIMARY.NUMBER
    })
  }

  createLevelCreate () {
    this.levelCreateButton = new TextButton({
      scene: this,
      x: this.game.scale.width * 0.5,
      y: this.game.scale.height * 0.7,
      callback: () => {
        if (this.game.scene.getScene('LevelCreate')) {
          this.game.scene.start('LevelCreate')
        } else {
          const levelCreate = new LevelCreate(this.game)
          this.game.scene.add(levelCreate.key, levelCreate, true)
        }

        this.game.scene.remove(this)
      },
      context: this,
      text: 'Level Create',
      size: '64px',
      color: color.PRIMARY.NUMBER
    })
  }
}
