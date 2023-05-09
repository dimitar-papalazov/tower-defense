/* eslint-disable no-unused-vars */
import EnemyConfig from './enemy.config.js'
import PointConfig from './point.config.js'
import SpecialsConfig from './specials.config.js'

export default class LevelConfig {
  /**
   * @type {EnemyConfig[][]} - Enemies array that will be generated in the level. Each subarray represent a row of enemies.
   */
  enemies
  /**
   * @type {Number} - Index of the level.
   */
  level
  /**
   * @type {PointConfig[]} - Array of points that represent the enemies' path.
   */
  path
  /**
   * @type {SpecialsConfig} - Specials configuration for the level
   */
  specials
}
