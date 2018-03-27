// public/js/controllers/MedidaController.js
console.log('public/js/controllers/MedidaController.js', Date.now());

angular.module('ushaped').controller('MedidaController',
	function($scope, $routeParams, Medida) {
	// function($scope, $routeParams, $http, $resource) {

		console.log("angular.module('ushaped').controller", Date.now());

		// var Medida = $resource('/contatos/:id');
		// console.log('Medida', Medida); 
		// console.log('typeof Medida', typeof Medida); 

		if($routeParams.medidaId) {
			console.log('$routeParams.medidaId. Vou chamar o /medidas/:id', Date.now());
			Medida.get({id: $routeParams.medidaId},
				function(medida) {
					// console.log('medida', medida); 
					$scope.medida = medida;
				},
				function(erro) {
					$scope.mensagem = {
						texto: 'Não foi possível obter o medida.'
					};
					console.log(erro);
				}
			);
		} else {
			$scope.medida = new Medida();
		}

		$scope.salva = function() {
			console.log('$scope.salva.', Date.now());
			// função $save gera por debaixo dos panos uma requisição do tipo POST que envia para 
			// http://localhost/medidas os dados do medida. $resource não dá suporte a PUT. 
			$scope.medida.$save()
			.then(function() {
				$scope.mensagem = {texto: 'Salvo com sucesso'};
					// limpa o formulário
					$scope.medida = new Medida();
				})
			.catch(function(erro) {
				$scope.mensagem = {texto: 'Não foi possível salvar'};
			});
			// para ser usado na diretiva do foco em meus-componentes.js
			// $scope.btnBackFocus = true;

			// event bus do AngularJS. Disparando evento para executar diretiva do foco.
			$scope.$broadcast('medidaSalvo');
		};

		Medida.query(function(medidas) {
			$scope.medidas = medidas;
		});

});