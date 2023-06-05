export default class Resource {
  constructor (config) {
    this.id = config.id;
    this.name = config.name;
    this.value = config.value;
    this.iconKey = config.iconKey;
    this.maxValue = config.maxValue;
    this.minValue = config.minValue;
  }

  updateValue (amount) {
    this.value += amount;
    if (this.value >= this.maxValue) this.value = this.maxValue;
    else if (this.value <= this.minValue) this.value = this.minValue;
  }
}
