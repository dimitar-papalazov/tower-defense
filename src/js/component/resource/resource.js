export default class Resource {
  /**
   * @param {ResourceConfig} config
   */
  constructor (config) {
    /** @type {number} */
    this.id = config.id;
    /** @type {string} */
    this.name = config.name;
    /** @type {number} */
    this.value = config.value;
    /** @type {string} */
    this.iconKey = config.iconKey;
    /** @type {number} */
    this.maxValue = config.maxValue;
    /** @type {number} */
    this.minValue = config.minValue;
  }

  /**
   * @param {number} amount
   */
  updateValue (amount) {
    this.value += amount;
    if (this.value >= this.maxValue) this.value = this.maxValue;
    else if (this.value <= this.minValue) this.value = this.minValue;
  }
}
