// validType.js: implements validation functions for each data type

"use strict";

// load all necessary modules
const { coercePrimitive } = require("keeno-system");

/**
 * Validates a single value by checking for requiredness and applying primitive coercion.
 * @param {Object} object - The object containing the property.
 * @param {string} key - The property name to validate.
 * @param {Object} [rule={}] - Validation rule object.
 * @param {boolean} [rule.required=true] - Whether the field is required.
 * @returns {{ value: any, message: string|undefined }}
 */
function validValue(object, key, rule = {}) {
  let value = object[key];
  let message = undefined;

  const required = rule?.required ?? true;

  if (required && (value === undefined || value === null || value === "")) {
    message = `"${key}" is required`;
  } else if (typeof value === "string") {
    value = coercePrimitive(value);
  }

  return { value, message };
}

/**
 * Validates a boolean value, with support for custom truthy/falsy values.
 * @param {Object} object
 * @param {string} key
 * @param {Object} [rule={}]
 * @param {Array<any>} [rule.trueValues]
 * @param {Array<any>} [rule.falseValues]
 * @returns {{ value: boolean|any, message: string|undefined }}
 */
function validBoolean(object, key, rule = {}) {
  let { value, message } = validValue(object, key, rule);
  if (message) return { value, message };

  const trueValues = rule?.trueValues ?? [true, "true", 1, "1"];
  const falseValues = rule?.falseValues ?? [false, "false", 0, "0"];

  if (trueValues.includes(value)) {
    value = true;
  } else if (falseValues.includes(value)) {
    value = false;
  } else {
    const showTrue = trueValues.map(v => JSON.stringify(v)).join(", ");
    const showFalse = falseValues.map(v => JSON.stringify(v)).join(", ");
    message = `"${key}" must be a boolean. Allowed true values: ${showTrue}. Allowed false values: ${showFalse}.`;
  }

  return { value, message };
}

/**
 * Compares the value of one field against another.
 * @param {Object} object
 * @param {string} key
 * @param {Object} rule
 * @param {string} rule.compareTo - The field to compare with.
 * @returns {{ value: any, message: string|undefined }}
 */
function validCompare(object, key, rule) {
  let { value, message } = validValue(object, key, rule);
  if (message) return { value, message };

  const compareKey = rule?.compareTo;
  if (!compareKey) {
    return { value, message: `"compareTo" is required in rule for "${key}"` };
  }

  const compareResult = validValue(object, compareKey, { required: rule.required });
  const compareValue = compareResult.value;

  if (compareResult.message || value !== compareValue) {
    message = `"${key}" must match "${compareKey}"`;
  }

  return { value, message };
}

/**
 * Validates and converts a date string to a Date object.
 * @param {Object} object
 * @param {string} key
 * @param {Object} rule
 * @returns {{ value: Date|any, message: string|undefined }}
 */
function validDate(object, key, rule) {
  let { value, message } = validValue(object, key, rule);

  if (!message) {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      message = `"${key}" is not a valid date`;
    } else {
      value = date;
    }
  }

  return { value, message };
}

/**
 * Validates an email address using a standard regex.
 * @param {Object} object
 * @param {string} key
 * @param {Object} rule
 * @returns {{ value: string|any, message: string|undefined }}
 */
function validEmail(object, key, rule) {
  let { value, message } = validValue(object, key, rule);

  if (!message) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof value !== "string" || !emailRegex.test(value)) {
      message = `"${key}" is not a valid email address`;
    }
  }

  return { value, message };
}

/**
 * Validates that a value exists in an enumerated set.
 * @param {Object} object
 * @param {string} key
 * @param {Object} rule
 * @param {Array<any>} rule.values - Allowed values.
 * @returns {{ value: any, message: string|undefined }}
 */
function validEnumerated(object, key, rule) {
  let { value, message } = validValue(object, key, rule);

  if (!message) {
    const options = rule?.values;
    if (!Array.isArray(options)) {
      message = `"values" array is required in rule for "${key}"`;
    } else if (!options.includes(value)) {
      message = `"${key}" must be one of: ${options.join(", ")}`;
    }
  }

  return { value, message };
}

/**
 * Validates a float and checks min/max range.
 * @param {Object} object
 * @param {string} key
 * @param {Object} rule
 * @param {number} [rule.min]
 * @param {number} [rule.max]
 * @returns {{ value: number|any, message: string|undefined }}
 */
function validFloat(object, key, rule) {
  let { value, message } = validValue(object, key, rule);

  if (!message) {
    const num = parseFloat(value);
    if (isNaN(num)) {
      message = `"${key}" is not a valid float`;
    } else {
      if (rule?.min !== undefined && num < rule.min) {
        message = `"${key}" must be at least ${rule.min}`;
      } else if (rule?.max !== undefined && num > rule.max) {
        message = `"${key}" must be at most ${rule.max}`;
      } else {
        value = num;
      }
    }
  }

  return { value, message };
}

/**
 * Validates an integer and checks min/max range.
 * @param {Object} object
 * @param {string} key
 * @param {Object} rule
 * @param {number} [rule.min]
 * @param {number} [rule.max]
 * @returns {{ value: number|any, message: string|undefined }}
 */
function validInteger(object, key, rule) {
  let { value, message } = validValue(object, key, rule);

  if (!message) {
    const num = parseInt(value, 10);
    if (isNaN(num)) {
      message = `"${key}" is not a valid integer`;
    } else {
      if (rule?.min !== undefined && num < rule.min) {
        message = `"${key}" must be at least ${rule.min}`;
      } else if (rule?.max !== undefined && num > rule.max) {
        message = `"${key}" must be at most ${rule.max}`;
      } else {
        value = num;
      }
    }
  }

  return { value, message };
}

/**
 * Validates a value against a regular expression pattern.
 * @param {Object} object
 * @param {string} key
 * @param {Object} rule
 * @param {string} rule.pattern - Regex pattern as string.
 * @returns {{ value: string|any, message: string|undefined }}
 */
function validMatch(object, key, rule) {
  let { value, message } = validValue(object, key, rule);

  if (!message) {
    if (!rule?.pattern) {
      message = `"pattern" is required in rule for "${key}"`;
    } else {
      const regex = new RegExp(rule.pattern);
      if (!regex.test(value)) {
        message = `"${key}" does not match required pattern`;
      }
    }
  }

  return { value, message };
}

/**
 * Validates a password based on configurable strength rules.
 * @param {Object} object
 * @param {string} key
 * @param {Object} rule
 * @param {number} [rule.minUpper=1]
 * @param {number} [rule.minLower=1]
 * @param {number} [rule.minDigits=1]
 * @param {number} [rule.minSymbols=1]
 * @param {number} [rule.minLength=12]
 * @returns {{ value: string, message: string|undefined }}
 */
function validPassword(object, key, rule) {
  let { value, message } = validValue(object, key, rule);

  if (!message && typeof value === "string") {
    const {
      minUpper = 1,
      minLower = 1,
      minDigits = 1,
      minSymbols = 1,
      minLength = 12,
    } = rule;

    const upper = (value.match(/[A-Z]/g) || []).length;
    const
