import Tower from '../component/units/buildings/Tower'
import MagicTower from '../component/units/buildings/MagicTower'
import CannonTower from '../component/units/buildings/CannonTower'

export default {
  TOWER: {
    TYPE: Tower.TYPE,
    TEXTURE: `${Tower.TYPE}Building`
  },
  MAGIC_TOWER: {
    TYPE: MagicTower.TYPE,
    TEXTURE: `${MagicTower.TYPE}Building`
  },
  CANNON_TOWER: {
    TYPE: CannonTower.TYPE,
    TEXTURE: `${CannonTower.TYPE}Building`
  }
}
