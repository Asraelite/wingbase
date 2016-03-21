'use strict';

const express = require('express');

class WebServer {
	constructor() {

	}

	start() {
		this.app = express();
		let app = this.app;

		app.use(express.static('public'));

		app.listen(8080);
	}
}

module.exports = WebServer;
