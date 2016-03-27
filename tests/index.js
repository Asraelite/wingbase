'use strict';

const io = require('socket.io-client');

const fuzz = require('./fuzz.js');

let socket = io('http://localhost:' + process.env.PORT);
socket.on('connect', test);

function test() {
	wingbase.debug('Running fuzz test.');
	fuzz(socket);

	wingbase.debug('Ending tests.');

	wingbase.stop();
}
