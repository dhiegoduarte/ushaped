// app/models/aluno.js
console.log('app/models/aluno.js', Date.now());

var mongoose = require('mongoose');

module.exports = function() {
	// console.log('module.exports', Date.now());
	
	var schema = mongoose.Schema({
		// Existem outros tipos como Number, Date, Boolean e Array,
		nome: {
			type: String,
			required: true
		},
		genero: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true,
			index: {
				unique: false //TODO DHIEGO
			}
		},
		telefone: {
			type: Number,
			required: true
		},
		altura: {
			type: Number,
			required: true
		},
		peso: {
			type: Number,
			required: true
		}
		// emergencia: {
		// 	type: mongoose.Schema.ObjectId,
		// 	ref: 'Aluno'
		// }
	});

	// Um Model é um objeto que corresponde a uma collection de nosso
	// banco e utiliza o Schema usado em sua criação para validar qualquer documento
	// que tenhamos na collection.
	// Na 1 vez (banco novo) uma collection com o nome passado abaixo (em lowercase e no plural) é criada
	return mongoose.model('Aluno', schema);
};