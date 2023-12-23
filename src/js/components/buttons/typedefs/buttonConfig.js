/**
 * @typedef ButtonConfig
 * @property {import('../../../scenes/towerDefenseScene').default} scene
 * @property {number} [x]
 * @property {number} [y]
 * @property {number} [width]
 * @property {number} [height]
 * @property {Function} [callback]
 * @property {object} [context]
 * @property {any[]} [params]
 * @property {number} [color]
 * @property {number} [lineWidth]
 * 
 * @typedef TextButtonAddition
 * @property {string} text
 * @property {Phaser.Types.GameObjects.Text.TextStyle} [textStyle]
 * 
 * @typedef {ButtonConfig & TextButtonAddition} TextButtonConfig
 * 
 * @typedef ToggleButtonAddition
 * @property {boolean} [toggle]
 * @property {string | Phaser.Textures.Texture} texture
 * 
 * @typedef {TextButtonConfig & ToggleButtonAddition} ToggleButtonConfig
 */