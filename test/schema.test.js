// schema.test.js:

"use strict";

// load all necessary modules
const assert = require("assert");
const { describe, it } = require("node:test");
const Schema = require("../lib/schema");

class TestSchema extends Schema {
  constructor() {
    super({
      propBoolean: this.boolean(),
      proptFloat:this.float(0,99.99)
      propInteger:this.integer(1,100)
      propString: this.string({ min: 1, max: 100 }),
    });
  }
}

describe("first test", () => {
  it("should be ok", () => {
    assert.strictEqual(1, 1, "1 should = 1");
  });
});
