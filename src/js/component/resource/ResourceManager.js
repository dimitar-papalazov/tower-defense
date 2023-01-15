import Phaser from 'phaser'
import Resource from './Resource'

export default class ResourceManager extends Phaser.Events.EventEmitter {
  constructor (game, resources) {
    super()
    this.game = game
    /**
     * @type Resource[]
     */
    this.resources = []
    this.events = { SAVE_RESOURCE: 'saveResource' }
    this.addResources(resources)
  }

  hasResource (value) {
    let result
    if (typeof value === 'number') result = !!this.resources.find(r => r.id === value)
    const id = parseInt(value)
    if (isNaN(id)) result = !!this.resources.find(r => r.name === value)
    else result = !!this.resources.find(r => r.id === id)

    if (!result) console.log(`Resource searched by value: ${value}, not found!`)
    return result
  }

  addResourceFromConfig (resourceConfig) {
    if (this.resources.find(resource => resource.id === resourceConfig.id)) {
      console.log(`Resource with id: ${resourceConfig.id}, already exists!`)
      return
    }

    const resource = new Resource(resourceConfig)
    this.resources.push(resource)
    this.emit(this.events.SAVE_RESOURCE, resource.name, resource.value)
  }

  addResource (resource) {
    if (this.resources.find(r => r.id === resource.id)) {
      console.log(`Resource with id: ${resource.id}, already exists!`)
      return
    }

    this.resources.push(resource)
    this.emit(this.events.SAVE_RESOURCE, resource.name, resource.value)
  }

  addResources (array) {
    const arrayLength = array.length

    for (let i = 0; i < arrayLength; i++) {
      this.addResourceFromConfig(array[i])
    }
  }

  getResource (value) {
    let resource = null
    if (typeof value === 'number') resource = this.resources.find(r => r.id === value)
    const id = parseInt(value)
    if (isNaN(id)) resource = this.resources.find(r => r.name === value)
    else resource = this.resources.find(r => r.id === id)

    if (!resource) {
      console.log(`Resource with id/name: ${value} not found!`)
      return null
    }

    return resource
  }

  removeResource (value) {
    const resource = this.getResource(value)
    this.resources.splice(this.resources.indexOf(resource), 1)
    this.emit(this.events.SAVE_RESOURCE, resource.name, null)
  }

  updateResource (value, amount) {
    const verb = amount === 1 ? 'has' : 'have'
    console.log(`${value}: ${amount} ${verb} been registered`)
    const resource = this.getResource(value)
    if (resource === null) return resource
    const oldValue = resource.value
    resource.updateValue(amount)
    const newValue = resource.value

    const result = {
      id: resource.id,
      name: resource.name,
      oldValue,
      newValue,
      maxValue: resource.maxValue,
      minValue: resource.minValue
    }

    this.emit(this.events.SAVE_RESOURCE, result)
    if (resource.isTimeRelated) resource.startTimer()
    return result
  }

  updateResourceValues (resources) {
    const keys = Object.keys(resources)

    for (const key of keys) {
      this.replaceResourceValue(key, resources[key])
    }
  }

  replaceResourceValue (key, value) {
    if (this.hasResource(key)) this.getResource(key).value = value
  }
}
