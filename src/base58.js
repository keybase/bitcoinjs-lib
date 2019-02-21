// Base58 encoding/decoding
// Originally written by Mike Hearn for BitcoinJ
// Copyright (c) 2011 Google Inc
// Ported to JavaScript by Stefan Thomas
// Merged Buffer refactorings from base58-native by Stephen Pair
// Copyright (c) 2013 BitPay Inc

var assert = require('assert')
var BigInteger = require('bn').BigInteger

var ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
var ALPHABET_BUF = Buffer.from(ALPHABET, 'ascii')
var ALPHABET_MAP = {}
for(var i = 0; i < ALPHABET.length; i++) {
  ALPHABET_MAP[ALPHABET.charAt(i)] = BigInteger.valueOf(i)
}
var BASE = BigInteger.valueOf(58)

function encode(buffer) {
  var bi = BigInteger.fromBuffer(buffer)
  var result = Buffer.from(buffer.length << 1)

  var i = result.length - 1
  while (bi.signum() > 0) {
    var remainder = bi.mod(BASE)
    bi = bi.divide(BASE)

    result[i] = ALPHABET_BUF[remainder.intValue()]
    i--
  }

  // deal with leading zeros
  var j = 0
  while (buffer[j] === 0) {
    result[i] = ALPHABET_BUF[0]
    j++
    i--
  }

  return result.slice(i + 1, result.length).toString('ascii')
}

function decode(string) {
  if (string.length === 0) return Buffer.alloc(0)

  var num = BigInteger.ZERO

  for (var i = 0; i < string.length; i++) {
    num = num.multiply(BASE)

    var figure = ALPHABET_MAP[string.charAt(i)]
    assert.notEqual(figure, undefined, 'Non-base58 character')

    num = num.add(figure)
  }

  // deal with leading zeros
  var j = 0
  while ((j < string.length) && (string[j] === ALPHABET[0])) {
    j++
  }

  var buffer = num.toBuffer()
  var leadingZeros = Buffer.alloc(j)
  leadingZeros.fill(0)

  return Buffer.concat([leadingZeros, buffer])
}

module.exports = {
  encode: encode,
  decode: decode
}
