'use strict';

const fs = require('fs');

require('colors');

class ServerInterface {
	constructor() {

	}

	log(msg) {
		let pad = (str, len, right) => {
			str = '' + str;
			return (right ? str : '') +
				Array(len > str.length ? 1 + len - str.length : 0)
				.join('0') + (right ? '' : str);
		}

		let d = new Date();
		let timestamp =
			`<${pad(d.getUTCHours(), 2)}:` +
			`${pad(d.getUTCMinutes(), 2)}:` +
			`${pad(d.getUTCSeconds(), 2)}.` +
			`${pad(('' + d.getUTCMilliseconds()).slice(0, 2), 2, true)}> `;
		let output = msg;
		Array.from(arguments).splice(1).forEach(a => output = output[a]);
		output = timestamp.gray + output;
		// Clear and go to start of line.
		console.log('\x1b[2K\x1b[999D' + output);

		let date =
			`${pad(d.getUTCFullYear(), 2)}-` +
			`${pad(d.getUTCMonth(), 2)}-` +
			`${pad(d.getUTCDate(), 2)}`;
		fs.appendFile('log/' + date + '.log', timestamp + msg + '\n');
	}

	debug(msg) {
		this.log(msg, 'cyan');
	}

	error(msg) {
		this.log(msg, 'red');
	}
}

module.exports = ServerInterface;
