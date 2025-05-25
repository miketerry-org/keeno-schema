// validObject.js

"use strict";

/**
 * Validates an object against a given schema using per-field validation functions.
 * - Applies default values if fields are missing and `default` is defined in the schema.
 * - Accumulates errors as objects with `field` and `message` for clarity and flexibility.
 *
 * @param {Object} object - The object to validate and coerce (e.g., form or config input).
 * @param {Object<string, Object>} schema - Validation schema defining rules for each key.
 * @param {Function} schema[].validate - The validation function to use for this field.
 * @param {boolean} [schema[].required=true] - Whether the field is required.
 * @param {*} [schema[].default] - Optional default value (or function) if field is missing.
 * @returns {{ object: Object, errors: Array<{ field: string, message: string }> }} - The validated object and an array of error objects.
 *
 * @example
 * const schema = {
 *   email: { validate: validEmail, required: true },
 *   debug: { validate: validBoolean, default: false },
 * };
 *
 * const result = validObject({ email: "me@example.com" }, schema);
 * // => { object: { email: "me@example.com", debug: false }, errors: [] }
 */
function validObject(object, schema) {
    // initialize empty object for errors
  const errors = [];

  loop thru all rules in the schema object
  Object.keys(schema).forEach(key => {
    // get the rule to apply for this object property
    const rule = schema[key];

    // if no rule or if not an object, then skip it
    if (!rule || typeof rule !== "object") {
      return;
    }

    // ensure the validate function is defined
    if (typeof rule.validate !== "function") {
      errors.push({
        field: key,
        message: `${key} is missing a validation function`,
      });
      return;
    }

    // Apply default value if not present
    if (object[key] === undefined && "default" in rule) {
      object[key] =
        typeof rule.default === "function" ? rule.default() : rule.default;
    }

    // call the data type specific validation function
    const { value, message } = rule.validate(object, key, rule);

    // if there was an error then add it to the array
    if (message) {
      errors.push({ field: key, message });
    } else {
        // assign the value after any modification
      object[key] = value;
    }
  });

  // return the updated object any errors
  return { object, errors };
}

module.exports = validObject;
