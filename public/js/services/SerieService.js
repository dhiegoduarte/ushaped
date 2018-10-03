// public/js/services/SerieService.js
console.log('public/js/services/SerieService.js', Date.now());

// Utilizando a instância de nosso módulo principal, utilizamos a função
// factory, que recebe como primeiro parâmetro o nome do serviço e, no segundo,
// a função que o define.
// serviço criado com factory deve retornar um objeto.
angular.module('ushaped').factory('Serie',
	["$resource", function($resource) {
		console.log("angular.module('ushaped').factory('Serie'", Date.now());
		// console.log('$resource',$resource);
		return $resource('/series/:id');
	}]);