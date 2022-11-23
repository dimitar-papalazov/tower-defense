import AbsorberCreep from '../component/units/AbsorberCreep'
import ArmoredCreep from '../component/units/ArmoredCreep'
import Creep from '../component/units/Creep'

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
