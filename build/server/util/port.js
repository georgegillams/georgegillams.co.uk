"use strict";

var argv = require('./argv');

module.exports = parseInt(argv.port || process.env.PORT || '3000', 10);
//# sourceMappingURL=port.js.map