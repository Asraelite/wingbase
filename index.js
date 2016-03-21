#!bin/node

'use strict';

const packageJson = require('./package.json');

console.log(`Starbugs version ${packageJson.version} running.`);

require('./server/')();
