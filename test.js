#!bin/node

'use strict';

process.env.PORT = 28256; // Unused as far as I know.

require('./server/')();

setTimeout(_ => {
	wingbase.debug('Starting tests.');

	require('./tests');
}, 1000);
