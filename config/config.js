// config/config.js
console.log('config/config.js', Date.now());

module.exports = function() {
	return require('./env/' + process.env.NODE_ENV + '.js');
}