
var crypto = require('crypto');

function sha1(buffer) {
  return crypto.createHash('sha1').update(buffer).digest()
}

function sha256(buffer) {
  return crypto.createHash('sha256').update(buffer).digest()
}

function ripemd160(buffer) { 
  return crypto.createHash('ripemd160').update(buffer).digest();
}

function HmacSHA256(data, secret) {
  return crypto.createHmac('sha256', secret).update(data).digest()
}

function HmacSHA512(data, secret) {
  return crypto.createHmac('sha512', secret).update(data).digest();
}

function hash160(buffer) {
  return ripemd160(sha256(buffer));
}

function hash256(buffer) {
  return sha256(sha256(buffer));
}

module.exports = {
  sha1: sha1,
  sha256: sha256,
  ripemd160 : ripemd160,
  HmacSHA256: HmacSHA256,
  HmacSHA512: HmacSHA512,
  hash256 : hash256,
  hash160 : hash160
};
