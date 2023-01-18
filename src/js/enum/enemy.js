import AbsorberCreep from '../component/units/enemies/AbsorberCreep'
import ArmoredCreep from '../component/units/enemies/ArmoredCreep'
import Creep from '../component/units/enemies/Creep'

export default {
  CREEP: {
    TYPE: Creep.TYPE,
    TEXTURE: `${Creep.TYPE}Enemy`
  },
  ABSORBER_CREEP: {
    TYPE: AbsorberCreep.TYPE,
    TEXTURE: `${AbsorberCreep.TYPE}Enemy`
  },
  ARMORED_CREEP: {
    TYPE: ArmoredCreep.TYPE,
    TEXTURE: `${ArmoredCreep.TYPE}Enemy`
  }
}
