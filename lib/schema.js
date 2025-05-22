// schema.js:

"use strict";

class Schema {
  #schema;

  constructor(schema = []) {
    this.#schema = schema;
  }

  validate(data) {}

  define(type, options = {}) {
    return { type, ...options };
  }

  boolean(options = {}) {
    return define("boolean", options);
  }

  float(options = {}) {
    return define("float", options);
  }

  integer(options = {}) {
    return define("integer", options);
  }

  string(options = {}) {
    return define("string", options);
  }
}

module.exports = Schema;
