var assert = require('assert')
var convert = require('../src/convert')

var fixtures = require('./fixtures/convert')

describe('convert', function() {
  describe('bufferToWordArray', function() {
    fixtures.valid.forEach(function(f) {
      it('converts ' + f.hex + ' correctly', function() {
        var buffer = Buffer.from(f.hex, 'hex')
        var result = convert.bufferToWordArray(buffer)
        f.result = result;

        assert.deepEqual(result, f.wordArray)
      })
    })
  })

  describe('wordArrayToBuffer', function() {
    fixtures.valid.forEach(function(f) {
      it('converts to ' + f.hex + ' correctly', function() {
        var resultHex = convert.wordArrayToBuffer(f.result).toString('hex')

        assert.deepEqual(resultHex, f.hex)
      })
    })
  })
})
