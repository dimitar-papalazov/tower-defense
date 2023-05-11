import enemyEnum from '../enum/enemy'
import buildingEnum from '../enum/building'

/**
 * Calculates the damage done to the provided enemy, from the provided building.
 * @param {string} building 
 * @param {string} enemy 
 */
export default function damageCalculator (building, enemy) {
  if (building === buildingEnum.TOWER.TYPE) {
    if (enemy === enemyEnum.CREEP.TYPE) return 10
    else if (enemy === enemyEnum.ABSORBER_CREEP.TYPE) return 3
    else if (enemy === enemyEnum.ARMORED_CREEP.TYPE) return 3
    else throw new Error(`Enemy does not exist, ${enemy}`)
  } else if (building === buildingEnum.MAGIC_TOWER.TYPE) {
    if (enemy === enemyEnum.CREEP.TYPE) return 5
    else if (enemy === enemyEnum.ABSORBER_CREEP.TYPE) return 1
    else if (enemy === enemyEnum.ARMORED_CREEP.TYPE) return 10
    else throw new Error(`Enemy does not exist, ${enemy}`)
  } else if (building === buildingEnum.CANNON_TOWER.TYPE) {
    if (enemy === enemyEnum.CREEP.TYPE) return 5
    else if (enemy === enemyEnum.ABSORBER_CREEP.TYPE) return 10
    else if (enemy === enemyEnum.ARMORED_CREEP.TYPE) return 1
    else throw new Error(`Enemy does not exist, ${enemy}`)
  } else {
    throw new Error(`Buliding does not exist, ${building}`)
  } 
}
