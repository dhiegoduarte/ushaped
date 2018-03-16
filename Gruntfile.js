// ushaped/Gruntfile.js
module.exports = function(grunt) {
	grunt.initConfig({
		// copia projeto para a pasta dist
		// copy: {
		// 	project: {
		// 		expand: true,
		// 		cwd: '.',
		// 		src: ['**', '!Gruntfile.js', '!package.json', '!bower.json'],
		// 		dest: 'dist'
		// 	}
		// },
		// // limpa pasta dist
		// clean: {
		// 	dist: {
		// 		src: 'dist'
		// 	}
		// },
	// 	usemin : {
	// 		html: 'dist/app/views/**/*.ejs'
	// 	},
	// 	useminPrepare: {
	// 		options: {
	// 			root: 'dist/public',
	// 			dest: 'dist/public'
	// 		},
	// 		html: 'dist/app/views/**/*.ejs'
	// 	},
	// 	ngAnnotate: {
	// 		scripts: {
	// 			expand: true,
	// 			src: ['dist/public/js/**/*.js']
	// 		}
	// 	}
	// });
	usemin : {
		html: 'app/views/**/*.ejs'
	},
	useminPrepare: {
		options: {
			root: 'public',
			dest: 'public'
		},
		html: 'app/views/**/*.ejs'
	},
	ngAnnotate: {
		scripts: {
			expand: true,
			src: ['public/js/**/*.js']
		},
	}
});
	// grunt.registerTask('default', ['dist', 'minifica']);
	// grunt.registerTask('dist', ['clean', 'copy']);
	grunt.registerTask('minifica', ['useminPrepare', 'ngAnnotate', 'concat', 'uglify', 'cssmin', 'usemin']);
	// grunt.loadNpmTasks('grunt-contrib-copy');
	// grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-ng-annotate');
};