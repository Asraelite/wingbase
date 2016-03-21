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
		this.appServer.listen(8080);

		let app = this.app;

		app.get('/starbugs.min.js', (req, res) => {
			minify(result => {
				res.contentType('starbugs.min.js');
				res.end(result);
			});
		});

		app.use(express.static('public'));
	}
}

module.exports = WebServer;
