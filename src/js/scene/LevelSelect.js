import Phaser from 'phaser'

export default class LevelSelect extends Phaser.Scene {
  preload () {
    this.load.json('level', 'src/assets/json/levels/level1.json')
  }

  create () {
    const level = this.cache.json.get('level')
    console.log(level.enemies)
    level.path.forEach(p => {
      this.add.image(p.x, p.y, 'missing')
    })
  }
}
