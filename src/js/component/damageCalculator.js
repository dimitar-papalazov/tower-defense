import enemy from '../enum/enemy'
import building from '../enum/building'

export default function damageCalculator (b, e) {
  if (b === building.TOWER.TYPE) {
    if (e === enemy.CREEP.TYPE) return 10
    else if (e === enemy.ABSORBER_CREEP.TYPE) return 3
    else if (e === enemy.ARMORED_CREEP.TYPE) return 3
    else throw new Error(`Enemy does not exist, ${e}`)
  } else if (b === building.MAGIC_TOWER.TYPE) {
    if (e === enemy.CREEP.TYPE) return 5
    else if (e === enemy.ABSORBER_CREEP.TYPE) return 1
    else if (e === enemy.ARMORED_CREEP.TYPE) return 10
    else throw new Error(`Enemy does not exist, ${e}`)
  } else if (b === building.CANNON_TOWER.TYPE) {
    if (e === enemy.CREEP.TYPE) return 5
    else if (e === enemy.ABSORBER_CREEP.TYPE) return 10
    else if (e === enemy.ARMORED_CREEP.TYPE) return 1
    else throw new Error(`Enemy does not exist, ${e}`)
  } else throw new Error(`Buliding does not exist, ${b}`)
}
