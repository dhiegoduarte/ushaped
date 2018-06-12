// public/js/services/AlunoService.js
console.log('public/js/services/AlunoService.js', Date.now());

// Utilizando a instância de nosso módulo principal, utilizamos a função
// factory, que recebe como primeiro parâmetro o nome do serviço e, no segundo,
// a função que o define.
// serviço criado com factory deve retornar um objeto.
angular.module('ushaped').factory('Aluno',
	["$resource", function($resource) {
		console.log("angular.module('ushaped').factory", Date.now());
		// console.log('$resource',$resource);
		return $resource('/alunos/:id');
	}]);