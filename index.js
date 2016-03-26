#!bin/node

'use strict';

const packageJson = require('./package.json');

console.log(`Wingbase version ${packageJson.version} running.`);

require('./server/')();
