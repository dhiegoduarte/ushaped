// test/spec/MedidaControllerSpec.js
console.log('test/spec/MedidaControllerSpec.js', Date.now());

describe("MedidaController", function() {
	var $scope, $httpBackend;

	beforeEach(function() {
		module('ushaped');
		inject(function($injector, _$httpBackend_) {
			// inject(function($injector) {
			$scope = $injector.get('$rootScope').$new();
			$httpBackend = _$httpBackend_;
			$httpBackend.when('GET', '/medidas/1').respond({_id: '1'});
			$httpBackend.when('GET', '/medidas').respond([{}]);
		});
	});
	
	it("Deve criar um Medida vazio quando nenhum parâmetro de rota for passado", 
		inject(function($controller) {
			$controller('MedidaController',
				{"$scope" : $scope});
			expect($scope.medida._id).toBeUndefined();
		}));

	it("Deve preencher o Medida quando parâmetro de rota for passado",
		inject(function($controller) {
			$controller('MedidaController', {
				// '$routeParams': {medidaId: '598858239373c0c268457552'}, 
				'$routeParams': {medidaId: 1}, 
				'$scope': $scope
			});
			$httpBackend.flush();
			expect($scope.medida._id).toBeDefined();
		}));
});