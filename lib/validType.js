// validType.js: implements validation functions for each data type

"use strict";

function validValue(object, key, rule) {
  // get the data  value from the object using it's key
  let value = object[key];

  // initialize any error message
  message = undefined;

  // if required is missing then set to true, caller must set to false explicitly to make optional
  const required = rule?.required ?? true;

  // ensure value exists if it is required
  if (required && (value === undefined || value === null || value === "")) {
    message = `"${key}" is required`;
  }

  // return the dproperty value and any error message
  return { value, message };
}

function validBoolean(object, key, rule) {
  let { value, message } = validValue(object, key, rule);

  // if no error but type is not boolean
  if (!message && typeof value !== "boolean") {
    message = `"${key}" is not a valid boolean`;
  }

  return { value, message };
}

/*
function validCompare(object, params) {
  result = validValue(data, params);
  return result;
}

function validDate(object, params) {
  result = validValue(data, params);
  return result;
}

function validEmail(object, params) {
  result = validValue(data, params);
  return result;
}

function validEnumerated(object, params) {
  result = validValue(data, params);
  return result;
}

function validFloat(object, params) {
  result = validValue(data, params);
  return result;
}

function validInteger(object, params) {
  result = validValue(data, params);
  return result;
}

function validMatch(object, params) {
  result = validValue(data, params);
  return result;
}

function validPassword(object, params) {
  result = validValue(data, params);
  return result;
}

function validString(object, params) {
  result = validValue(data, params);
  return result;
}

function validTime(object, params) {
  result = validValue(data, params);
  return result;
}

function validTimestamp(object, params) {
  result = validValue(data, params);
  return result;
}

module.exports = {
  validBoolean,
  validCompare,
  validDate,
  validEmail,
  validEnumerated,
  validFloat,
  validInteger,
  validMatch,
  validPassword,
  validString,
  validTime,
  validTimestamp,
};
*/
