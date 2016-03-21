'use strict';

window.addEventListener('load', init);

var socket;

function init() {
	socket = io.connect('http://localhost:8080');
}
