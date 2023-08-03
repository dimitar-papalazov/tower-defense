import Phaser from 'phaser';
import Resource from './resource';
import TowerDefenseGame from '../../game/towerDefenseGame';

export default class ResourceManager extends Phaser.Events.EventEmitter {
  /**
   * @param {TowerDefenseGame} game
   * @param {ResourceConfig[]} resources
   */
  constructor (game, resources) {
    super();
    this.game = game;
    /**
     * @type Resource[]
     */
    this.resources = [];
    this.events = { SAVE_RESOURCE: 'saveResource' };
    this.addResources(resources);
  }

  /**
   * @param {string} value
   * @returns {boolean}
   */
  hasResource (value) {
    let result = false;
    const id = parseInt(value);

    if (isNaN(id)) result = !!this.resources.find(r => r.name === value);
    else result = !!this.resources.find(r => r.id === id);

    if (!result) console.log(`Resource searched by value: ${value}, not found!`);

    return result;
  }

  /**
   * @param {ResourceConfig} resourceConfig
   */
  addResourceFromConfig (resourceConfig) {
    if (this.resources.find(resource => resource.id === resourceConfig.id)) {
      console.log(`Resource with id: ${resourceConfig.id}, already exists!`);
      return;
    }

    const resource = new Resource(resourceConfig);
    this.resources.push(resource);
    this.emit(this.events.SAVE_RESOURCE, resource.name, resource.value);
  }

  /**
   * @param {Resource} resource
   */
  addResource (resource) {
    if (this.resources.find(r => r.id === resource.id)) {
      console.log(`Resource with id: ${resource.id}, already exists!`);
      return;
    }

    this.resources.push(resource);
    this.emit(this.events.SAVE_RESOURCE, resource.name, resource.value);
  }

  /**
   * @param {ResourceConfig[]} array
   */
  addResources (array) {
    const arrayLength = array.length;

    for (let i = 0; i < arrayLength; i++) {
      this.addResourceFromConfig(array[i]);
    }
  }

  /**
   * @param {string} value
   * @returns {Resource}
   */
  getResource (value) {
    let resource = null;
    const id = parseInt(value);

    if (isNaN(id)) resource = this.resources.find(r => r.name === value);
    else resource = this.resources.find(r => r.id === id);

    if (!resource) {
      console.log(`Resource with id/name: ${value} not found!`);
      return null;
    }

    return resource;
  }

  /**
   * @param {string} value
   */
  removeResource (value) {
    const resource = this.getResource(value);
    this.resources.splice(this.resources.indexOf(resource), 1);
    this.emit(this.events.SAVE_RESOURCE, resource.name, null);
  }

  /**
   * @param {string} value
   * @param {number} amount
   * @returns {ResourceResultConfig|Resource}
   */
  updateResource (value, amount) {
    const resource = this.getResource(value);
    if (resource === null) return resource;
    const oldValue = resource.value;
    resource.updateValue(amount);
    const newValue = resource.value;

    const result = {
      id: resource.id,
      name: resource.name,
      oldValue,
      newValue,
      maxValue: resource.maxValue,
      minValue: resource.minValue
    };

    this.emit(this.events.SAVE_RESOURCE, result);
    return result;
  }

  /**
   * @param {string} key
   * @param {number} value
   */
  replaceResourceValue (key, value) {
    if (this.hasResource(key)) this.getResource(key).value = value;
  }
}
