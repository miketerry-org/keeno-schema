// schema.js: function to initialize a schema specification

"use strict";

// load all necessary modules
const dataTypes = require("./dataTypes.js");

class Schema {
  #definition;

  constructor(definition) {
    this.#definition = definition;
  }

  validate(data) {
    throw new Error("Schema.validate not implemented");
  }

  static types = dataTypes;
}

module.exports = Schema;
