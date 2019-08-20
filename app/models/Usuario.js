// app/models/Usuario.js
console.log('app/models/Usuario.js', Date.now());

var mongoose = require('mongoose');

// importando o plugin
var findOrCreate = require('mongoose-findorcreate');

module.exports = function() {
	// console.log('module.exports', Date.now());
	
	var schema = mongoose.Schema({
		login: {
			type: String,
			required: true,
			index: {
				unique: true
			}
		},
		nome: {
			type: String,
			required: true,
		},
		inclusao: {
			type: Date,
			default: Date.now
		}
	});
	schema.plugin(findOrCreate);
	return mongoose.model('Usuario', schema);
};