'use strict';

const express = require('express');

const minify = require('./minify.js');

class WebServer {
	constructor() {

	}

	start() {
		this.app = express();
		let app = this.app;

		app.get('/starbugs.min.js', (req, res) => {
			minify(result => {
				res.contentType('starbugs.min.js');
				res.end(result);
			});
		});

		app.use(express.static('public'));

		app.listen(8080);
	}
}

module.exports = WebServer;
