import AbsorberCreep from '../units/enemies/absorberCreep';
import ArmoredCreep from '../units/enemies/armoredCreep';
import Creep from '../units/enemies/creep';
import Phaser from 'phaser';
import Level from '../../scene/level';
import enemyEnum from '../../enum/enemy';
import buildingEnum from '../../enum/building.js';
import events from '../../enum/events';

export default class EnemyService {
  /**
   *
   * @param {Level} scene
   * @param {*} enemies
   * @param {*} path
   */
  constructor (scene, enemies, path) {
    this.scene = scene;
    this.emitter = this.scene.game.emitter;
    this.resourceManager = this.scene.game.resourceManager;
    this.enemies = enemies;
    this.path = path;
    this.currentRow = [];
    this.enemiesKilled = 0;
    this.enemiesFinished = 0;
    this.enemiesInCurrentRow = 0;
    this.setupEvents();
  }

  setupEvents () {
    this.emitter.on(events.ENEMY_FINISHED, this.onEnemyFinished, this);
    this.emitter.on(events.ENEMY_KILLED, this.onEnemyKilled, this);
    this.emitter.on(events.ROW_START, this.startRow, this);
    this.emitter.on(events.ENEMY_ATTACKED, this.onEnemyAttacked, this);
  }

  onEnemyFinished () {
    this.resourceManager.updateResource('heart', -1);

    if (this.resourceManager.getResource('heart').value === 0) {
      this.emitter.emit(events.LEVEL_FINISHED, false);
      return;
    }

    this.enemiesFinished++;
    if (this.enemiesKilled + this.enemiesKilled === this.enemiesInCurrentRow) this.emitter.emit(events.ROW_FINISHED);
  }

  onEnemyKilled (id) {
    this.resourceManager.updateResource('coin', 10);
    this.enemiesKilled++;
    let toSplice = -1;

    for (let i = 0; i < this.currentRow; i++) {
      if (this.currentRow[i].id === id) {
        toSplice = i;
        break;
      }
    }

    this.currentRow.splice(toSplice, 1);
    if (!this.currentRow.length) this.emitter.emit(events.ROW_FINISHED);
  }

  startRow () {
    this.scene.removeSigns();
    this.enemiesKilled = 0;
    const row = this.enemies.shift();
    if (!row) return;

    const enemies = row.map(item => {
      const array = [];

      for (let i = 0; i < item.number; i++) {
        let e = null;
        if (item.type === Creep.TYPE) {
          e = new Creep(this.scene, this.path[0].x - 100, this.path[0].y);
        } else if (item.type === AbsorberCreep.TYPE) {
          e = new AbsorberCreep(this.scene, this.path[0].x - 100, this.path[0].y);
        } else if (item.type === ArmoredCreep.TYPE) {
          e = new ArmoredCreep(this.scene, this.path[0].x - 100, this.path[0].y);
        }

        e.setScale(0.5);
        e.id = i;
        array.push(e);
      }

      return Phaser.Math.RND.shuffle(array);
    });

    this.currentRow = Phaser.Math.RND.shuffle(enemies.flat());
    this.enemiesInCurrentRow = this.currentRow.length;
    this.startMoving();
  }

  startMoving () {
    const enemyLength = this.currentRow.length;

    for (let i = 0; i < enemyLength; i++) {
      this.scene.time.delayedCall(1600 * i, this.moveEnemy, [this.currentRow[i]], this);
    }
  }

  moveEnemy (e) {
    if (e.dead) return;
    if (e.position === undefined) e.position = 0;
    else e.position++;

    if (e.position === this.path.length) {
      this.emitter.emit(events.ENEMY_FINISHED);
      e.destroy();
      return;
    }

    const { x, y } = this.path[e.position];
    e.setX(x);
    e.setY(y);
    this.emitter.emit(events.ENEMY_MOVED, e);
    this.scene.time.delayedCall(20, this.moveEnemy, [e], this);
  }

  /**
   * @param {number} id 
   * @param {string} type 
   */
  onEnemyAttacked (id, type) {
    const enemy = this.currentRow.find(enemy => enemy.id === id);
    if (!enemy) return;
    enemy.health -= this.calculateDamage(type, enemy.type);
    if (enemy.health > 0) return;
    enemy.dead = true;
    this.emitter.emit(events.ENEMY_KILLED);
    enemy.destroy();
  }

  /**
   * Calculates the damage done to the provided enemy, from the provided building.
   * @param {string} building 
   * @param {string} enemy 
   */
  calculateDamage (building, enemy) {
    if (building === buildingEnum.TOWER.TYPE) {
      if (enemy === enemyEnum.CREEP.TYPE) return 10;
      else if (enemy === enemyEnum.ABSORBER_CREEP.TYPE) return 3;
      else if (enemy === enemyEnum.ARMORED_CREEP.TYPE) return 3;
      else throw new Error(`Enemy does not exist, ${enemy}`);
    } else if (building === buildingEnum.MAGIC_TOWER.TYPE) {
      if (enemy === enemyEnum.CREEP.TYPE) return 5;
      else if (enemy === enemyEnum.ABSORBER_CREEP.TYPE) return 1;
      else if (enemy === enemyEnum.ARMORED_CREEP.TYPE) return 10;
      else throw new Error(`Enemy does not exist, ${enemy}`);
    } else if (building === buildingEnum.CANNON_TOWER.TYPE) {
      if (enemy === enemyEnum.CREEP.TYPE) return 5;
      else if (enemy === enemyEnum.ABSORBER_CREEP.TYPE) return 10;
      else if (enemy === enemyEnum.ARMORED_CREEP.TYPE) return 1;
      else throw new Error(`Enemy does not exist, ${enemy}`);
    } else {
      throw new Error(`Buliding does not exist, ${building}`);
    }
  }

  destroy () {
    this.emitter.off(events.ENEMY_FINISHED, this.onEnemyFinished, this);
    this.emitter.off(events.ENEMY_KILLED, this.onEnemyKilled, this);
    this.emitter.off(events.ROW_START, this.startRow, this);
    this.emitter.off(events.ENEMY_ATTACKED, this.onEnemyAttacked, this);
  }
}
