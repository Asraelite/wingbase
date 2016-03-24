const colors = require('colors');
const fs = require('fs');
const path = require('path');
const recursive = require('recursive-readdir');
const uglify = require('uglify-js');

function minifyJs(callback) {
	callback = callback || function() {};

	var dir = path.join(__dirname, '../../public/js/starbugs');
	var cache = '';

	recursive(dir, function(err, files) {
		for(var i in files) {
			cache += fs.readFileSync(files[i], 'utf8').toString();
		}

		var comment = '';

		// Remove to re-enable minifying.
		callback(cache); return;

		try {
			cache = uglify.minify(cache, { fromString: true }).code;

			comment = '/* This is a minified file. ';
			comment += 'If you would like to view the source in a more readable format, ';
			comment += 'please contact the developer.*/\n'
		} catch(err) {
			console.log('Error parsing kelvin.min.js file'.red);


			comment = '/* This file could not be minified because of JS syntax errors.';
			comment += ' If you encounter errors when running Starbugs, please contact';
			comment += ' a developer.*/\n'
		}

		callback(comment + cache);
	});
}

module.exports = minifyJs;
