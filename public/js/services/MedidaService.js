// public/js/services/ContatoService.js
console.log('public/js/services/MedidaService.js', Date.now());

// Utilizando a instância de nosso módulo principal, utilizamos a função
// factory, que recebe como primeiro parâmetro o nome do serviço e, no segundo,
// a função que o define.
// serviço criado com factory deve retornar um objeto.
angular.module('ushaped').factory('Medida',
	["$resource", function($resource) {
		console.log("angular.module('ushaped').factory", Date.now());
		// console.log('$resource',$resource);
		return $resource('/medidas/:id');
	}]);