
var triplesec = require('triplesec');
var hash = triplesec.hash;
var WordArray = triplesec.WordArray;

function to_word_array (buf) {
	if (typeof(buf) === 'string') { return WordArray.from_utf8(buf); }
	else { return WordArray.from_buffer(buf); }
}

function make_hasher(klass) {
	return function(buffer) {
		var obj = new klass();
		obj.update(to_word_array(buffer));
		return obj.finalize().to_buffer();
	};
};

function make_hmac(klass) {
	return function(data,secret) {
		var key = to_word_array(secret);
		var obj = new triplesec.HMAC(key, klass);
		obj.update(to_word_array(data));
		return obj.finalize().to_buffer();
	};
};

function make_double_hash(klass0, klass1) {
	return function (data) {
		var h1 = new klass0 ();
		var h2 = new klass1 ();
		h1.update(to_word_array(data));
		h2.update(h1.finalize());
		return h2.finalize().to_buffer();
	};
};

exports.sha1 = make_hasher(hash.SHA1);
exports.ripemd160 = make_hasher(hash.RIPEMD160);
exports.sha256 = make_hasher(hash.SHA256);
exports.sha512 = make_hasher(hash.SHA512);
exports.HmacSHA256 = make_hmac(hash.SHA256);
exports.HmacSHA512 = make_hmac(hash.SHA512);
exports.hash256 = make_double_hash(hash.SHA256, hash.SHA256);
exports.hash160 = make_double_hash(hash.SHA256, hash.RIPEMD160);

