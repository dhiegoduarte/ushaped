// app/routes/index.js
console.log('app/routes/index.js', Date.now());

module.exports = function(app) {
	app.get('/', function(req, res) {
		var login = '';
		if(req.user) {
			login = req.user.login;
		}

		// console.log('req', req);

		res.render('index', { "usuarioLogado" : login});
	});
};