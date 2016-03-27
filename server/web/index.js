'use strict';

const express = require('express');
const http = require('http');

const minify = require('./minify.js');

class WebServer {
	constructor() {
		this.app = express();
		this.appServer = http.Server(this.app);
	}

	start() {
		this.appServer.listen(process.env.PORT || 8080);

		let app = this.app;

		app.set('views', './public/views');
		app.set('view engine', 'jade');
		app.engine('jade', require('jade').__express);

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
