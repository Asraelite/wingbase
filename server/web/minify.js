'use strict';

const colors = require('colors');
const fs = require('fs');
const path = require('path');
const recursive = require('recursive-readdir');
const traceur = require('traceur');
const uglify = require('uglify-js');

function minifyJs(callback) {
	callback = callback || function() {};

	var dir = path.join(__dirname, '../../public/static/js/wingbase');
	var cache = '';
	var scripts = [];

	var getPriority = (file) => {
		if (file.slice(0, 3) == '//@') {
			let a = +file.split('\n')[0].slice(3);
			return a;
		} else return 0;
	}

	recursive(dir, function(err, files) {
		for(var file of files) {
			let code = fs.readFileSync(file, 'utf8').toString();
			scripts.push(code);
		}

		scripts.sort((a, b) => getPriority(b) - getPriority(a));
		scripts = scripts.map(s => s.replace(/(\/\/@\d+\n)/, ''));

		let comment = '';

		cache = scripts.join('');

		if (!wingbase.args.development)
			cache = traceur.compile(cache);

		if (wingbase.args.development) {
			callback(cache);
			return;
		}

		try {
			cache = uglify.minify(cache, { fromString: true }).code;

			comment = '/* This is a minified file. ';
			comment += 'If you would like to view the source in a more readable format, ';
			comment += 'please contact the developer.*/\n'
		} catch(err) {
			console.log('Error parsing wingbase.min.js file'.red);


			comment = '/* This file could not be minified because of JS syntax errors.';
			comment += ' If you encounter errors when running Starbugs, please contact';
			comment += ' a developer.*/\n'
		}

		callback(comment + cache);
	});
}

module.exports = minifyJs;
