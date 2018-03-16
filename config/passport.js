// config/passport.js
console.log('config/passport.js', Date.now());

var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var mongoose = require('mongoose');

var config = require('./config')();

module.exports = function() {
	// console.log('module.exports', Date.now());
	
	var Usuario = mongoose.model('Usuario');
	var githubCallback = 'http://' + config.domain + ':' + config.port + '/auth/github/callback';

	console.log('githubCallback',githubCallback);

	passport.use(new GitHubStrategy({
		// clientID: 'fae20a81a810fc1c4453',
		// clientSecret: '1c01e238e72c68d67e4d5834a6a55b4ec29ff438',

		clientID: config.clientID,
		clientSecret: config.clientSecret,
		// callbackURL: 'http://localhost:3000/auth/github/callback'
		callbackURL: githubCallback

	}, function(accessToken, refreshToken, profile, done) {
		Usuario.findOrCreate(
			{ "login" : profile.username},
			{ "nome" : profile.username},
			function(erro, usuario) {
				if(erro) {
					console.log(erro);
					return done(erro);
				}
				return done(null, usuario);
			}
		)}));

	/*
	Chamado apenas UMA vez e recebe o usuário do nosso
	banco disponibilizado pelo callback da estratégia de
	autenticação. Realizará a serialização apenas do
	ObjectId do usuário na sessão.
	*/
	passport.serializeUser(function(usuario, done) {
		done(null, usuario._id);
	});

	passport.deserializeUser(function(id, done) {
		Usuario.findById(id).exec()
		.then(function(usuario) {
			done(null, usuario);
		});
	});
};