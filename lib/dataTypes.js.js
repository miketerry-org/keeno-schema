// dataTypes.js: implements function to create data type specific schema fragements

"use strict";

// load all necessary modules
const {
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
} = require("./valid.js");

function define(type, options, validate) {
  return { type, ...options, validate };
}

function boolean(options = {}) {
  return define("date", options, validBoolean);
}

function compare(options = {}) {
  return define("compare", options, validCompare);
}

function date(options = {}) {
  return define("date", options, validDate);
}

function email(options = {}) {
  return define("email", options, validEmail);
}

function enumerated(options = {}) {
  return define("enumerated", options, validEnumerated);
}

function float(options = {}) {
  return define("float", options, validFloat);
}

function integer(options = {}) {
  return define("integer", options, validInteger);
}

function password(options = {}) {
  return define("password", options, validFloat);
}

function match(options = {}) {
  return define("match", options, validMatch);
}

function string(options = {}) {
  return define("string", options, validString);
}

function time(options = {}) {
  return define("time", options, validTime);
}

function timestamp(options = {}) {
  return define("timestamp", options, validTimestamp);
}

module.exports = {
  boolean,
  compare,
  date,
  email,
  enumerated,
  float,
  integer,
  match,
  password,
  string,
  time,
  timestamp,
};
