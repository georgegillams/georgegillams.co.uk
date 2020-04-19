"use strict";

/* eslint-disable no-console */
var chalk = require('chalk');

var ip = require('ip');

var divider = chalk.gray('\n-----------------------------------');
/**
 * Logger middleware, you can customize it to make messages more personal
 */

var logger = {
  // Called whenever there's an error on the server we want to print
  error: function error(err) {
    console.error(chalk.red(err));
  },
  // Called when express.js app starts on given port w/o errors
  appStarted: function appStarted(port, host) {
    console.log("Server started ! ".concat(chalk.green('✓')));
    console.log("\n".concat(chalk.bold('Access URLs:')).concat(divider, "\nLocalhost: ").concat(chalk.magenta("http://".concat(host, ":").concat(port)), "\n      LAN: ").concat(chalk.magenta("http://".concat(ip.address(), ":").concat(port))).concat(divider, "\n").concat(chalk.blue("Press ".concat(chalk.italic('CTRL-C'), " to stop")), "\n    "));
  }
};
module.exports = logger;
//# sourceMappingURL=logger.js.map