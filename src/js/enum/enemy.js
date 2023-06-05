import color from './color.js';

export default {
  ENEMY: {
    TYPE: 'Enemy',
    TEXTURE: 'enemy',
    COLOR: color.WHITE.NUMBER
  },
  CREEP: {
    TYPE: 'Creep',
    COLOR: color.MAGENTA.NUMBER
  },
  ABSORBER_CREEP: {
    TYPE: 'AbsorberCreep',
    COLOR: color.TURQUOISE.NUMBER
  },
  ARMORED_CREEP: {
    TYPE: 'ArmoredCreep',
    COLOR: color.YELLOW.NUMBER
  }
};
