// objectSchema.js:

class ObjectSchema {
  #errors;
  #rules;

  constructor() {
    this.#errors = [];
    this.#rules = {};
  }

  addRule(name, options, override = false) {
    // if duplicate rule and override turned off
    if (this[name] && !override) {
      throw new Error(`${name}" rule already defined.`);
    }

    // assign the rule
    this.#rules[name] = options;
  }
}
