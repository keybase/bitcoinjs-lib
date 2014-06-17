var WordArray = require('triplesec').WordArray;

function bufferToWordArray(buffer) { return WordArray.from_buffer(buffer); }
function wordArrayToBuffer(wordArray) { return wordArray.to_buffer(); }

module.exports = {
  bufferToWordArray: bufferToWordArray,
  wordArrayToBuffer: wordArrayToBuffer
}
