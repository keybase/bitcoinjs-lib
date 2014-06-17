
if (false && process && process.versions && process.versions.node) {
  module.exports = require('./crypto_node'); 
} else {
  module.exports = require('./crypto_triplesec');
}
