// app/models/contato.js
console.log('app/models/serie.js', Date.now());

var mongoose = require('mongoose');

module.exports = function() {
	// console.log('module.exports', Date.now());
	
	var schemaExercicios = mongoose.Schema({
		exercicio: {
			type: mongoose.Schema.ObjectId,
			ref: 'Exercicio'
		},
		quantidade: {
			type: String,
			required: true
		},
		medida: {
			type: mongoose.Schema.ObjectId,
			ref: 'Medida'
		}
	});

	var schema = mongoose.Schema({
		// Existem outros tipos como Number, Date, Boolean e Array,
		nome: {
			type: String,
			required: true,
			index: {
				unique: true
			}
		}
		,
		exercicios: [schemaExercicios]
		// exercicio: {
		// 	type: mongoose.Schema.ObjectId,
		// 	ref: 'Exercicio'
		// },
		// quantidade: {
		// 	type: String,
		// 	required: true
		// },
		// medida: {
		// 	type: mongoose.Schema.ObjectId,
		// 	ref: 'Medida'
		// }
	});

	// Um Model é um objeto que corresponde a uma collection de nosso
	// banco e utiliza o Schema usado em sua criação para validar qualquer documento
	// que tenhamos na collection.
	// Na 1 vez (banco novo) uma collection com o nome passado abaixo (em lowercase e no plural) é criada
	return mongoose.model('Serie', schema);
};