'use strict';

const assert = require('assert');

function fuzz(socket) {
	let types = ['setName', 'chat', 'inputs'];

	// Heh, they align.
	let msg = Array(25).fill().map(v => {
		let rndstr = Math.random().toString(36).substr(Math.random() * -5 - 1);
		return Array(Math.random() * 20 | 0).fill().map(v => {
			return Math.random() > 0.5 ? Math.random() * 10 : rndstr;
		});
	}).concat(Array(75).fill().map(v => {
		return Math.random() * 50;
	}));

	for (var i = 0; i < 100; i++) {
		let type = types[Math.random() * types.length | 0];
		socket.send(type, msg[i]);
	}

	wingbase.debug('Sent 100 random messages.');
}

module.exports = fuzz;
