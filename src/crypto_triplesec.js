
var triplesec = require('triplesec');
var hash = triplesec.hash;
var WordArray = triplesec.WordArray;

function make_hasher(klass) {
	return function(buffer) {
		var obj = new klass();
		obj.update(WordArray.from_buffer(buffer));
		return obj.finalize().to_buffer();
	};
};

function make_hmac(klass) {
	return function(data,secret) {
		var key = WordArray.from_buffer(secret);
		var obj = new triplesec.HMAC(key, klass);
		obj.update(WordArray.from_buffer(data));
		return obj.finalize().to_buffer();
	};
};

function make_double_hash(klass0, klass1) {
	return function (data) {
		var h1 = new klass0 ();
		var h2 = new klass1 ();
		h1.update(WordArray.from_buffer(buffer));
		h2.update(h1.finalize());
		return h2.finalize().to_buffer();
	};
};

exports.sha1 = make_hasher(hash.SHA1);
exports.ripemd160 = make_hasher(hash.RIPEMD160);
exports.sha256 = make_hasher(hash.SHA256);
exports.HmacSHA256 = make_hmac(hash.SHA256);
exports.HmacSHA512 = make_hmac(hash.SHA512);
exports.hash256 = make_double_hash(hash.SHA256, hash.SHA256);
exports.hash160 = make_double_hash(hash.SHA256, hash.RIPEMD160);

