// Logic that checks if dev/prod mode and return the values appropritely

/**
 * Since we are using Heroku to deploy the application, it automatically sets the value of NODE_EMV in
 * environment variable. i.e.,
 * process.env.NODE_ENV
 */

if (process.env.NODE_ENV === "production") {
  module.exports = require("./prod");
} else {
  module.exports = require("./dev");
}
