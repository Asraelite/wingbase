'use strict';

const express = require('express');
const http = require('http');
const nib = require('nib');
const stylus = require('stylus');

const minify = require('./minify.js');

class WebServer {
	constructor() {
		this.app = express();
		this.appServer = http.Server(this.app);
	}

	start() {
		this.appServer.listen(wingbase.args.port);

		let app = this.app;

		app.set('views', 'public/views');
		app.set('view engine', 'pug');
		app.engine('pug', require('pug').__express);

		app.use(stylus.middleware({
			src: 'public/stylus',
			dest: 'public/static/css',
			force: wingbase.args.development,
			compile: (str, path) => {
				return stylus(str)
					.set('filename', path)
					.use(nib())
			}
		}));

		app.get('/wingbase.min.js', (req, res) => {
			minify(result => {
				res.contentType('wingbase.min.js');
				res.end(result);
			});
		});

		app.get('/', (req, res) => {
			try {
				res.render('index', {});
			} catch(err) {
				wingbase.error('Renderng error:' + err);
				res.render('error/500', { error: err });
			}
		});

		app.use(express.static('public/static'));
	}
}

module.exports = WebServer;
