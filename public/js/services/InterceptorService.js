// public/js/services/InterceptorService.js
console.log('public/js/services/InterceptorService.js', Date.now());

angular.module('ushaped')
.factory('meuInterceptor',
	function($location, $q) {
		var interceptor = {
			responseError: function(resposta) {
				if (resposta.status == 401) {
					$location.path('/auth');
				}
				return $q.reject(resposta);
			}
		}
		return interceptor;
	});