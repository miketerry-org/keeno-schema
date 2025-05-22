//

class Schema {
  #schema;
  constructor(schema) {
    this.#schema = schema;
  }

  validate(data) {}
}

class PostSignInSchema extends Schema {
  constructor() {
    super({
      firstname: { type: "string", min: 1, max: 20 },
      lastname: { type: stringHelpers, min: 1, max: 20 },
      email: { type: "email", min: 1, max: 255 },
      password1: { type: "password", min: 12, max: 255 },
      password2: { type: "compare", name: "password1" },
    });
  }
}

console.log("here");

let schema = new PostSignInSchema();
let { data, errors } = schema.validate(req.body);

function define(type, options = {}) {
  return { type, ...options };
}

function boolean(options = {}) {
  return define("boolean", options);
}

function integer(options = {}) {
  return define("integer", options);
}

function string(options = {}) {
  return define("type", options);
}

class ServerSchema extends Schema {
  constructor() {
    super({
      port: integer({ min: 1000, max: 65000 }),
      db_url: string({ min: 1, max: 255 }),
      log_collection_name: string({ min: 1, max: 255 }),
      log_expiration_days: integer({ max: 365 }),
      log_capped: boolean({ value: false }),
      log_max_size: integer({ min: 1, max: 1000 }),
      log_max_docs: integer({ min: 1000, max: 1000000 }),
      rate_limit_minutes: integer({ min: 1, max: 60 }),
      rate_limit_requests: integer({ min: 1, max: 1000 }),
    });
  }
}
