'use strict';

const fs = require('fs');

const pad = (str, len, right) => {
	str = '' + str;
	return (right ? str : '') +
		Array(len > str.length ? 1 + len - str.length : 0)
		.join('0') + (right ? '' : str);
};

require('colors');

class ServerInterface {
	constructor() {

	}

	log(msg) {
		if (!fs.existsSync('log')){
    		fs.mkdirSync('log');
		}

		let timestamp = this.timestamp;
		let output = msg;
		Array.from(arguments).splice(1).forEach(a => output = output[a]);
		output = timestamp.gray + output;
		// Clear and go to start of line.
		console.log('\x1b[2K\x1b[999D' + output);
		fs.appendFile(this.logfile, timestamp + msg + '\n', () => {});
	}

	debug(msg) {
		this.log(msg, 'cyan');
	}

	error(msg) {
		this.log(msg, 'red', 'bold');
	}

	warning(msg) {
		this.log(msg, 'yellow');
	}

	capLogfile() {
		fs.appendFileSync(this.logfile, '-----------\n');
	}

	get timestamp() {
		let d = new Date();
		return '<' + d.toISOString() + '> ';
		//return `<${pad(d.getUTCHours(), 2)}:` +
		//	`${pad(d.getUTCMinutes(), 2)}:` +
		//	`${pad(d.getUTCSeconds(), 2)}.` +
		//	`${pad(('' + d.getUTCMilliseconds()).slice(0, 2), 2, true)}> `;
	}

	get logfile() {
		let d = new Date();
		let date =
			`${pad(d.getUTCFullYear(), 2)}-` +
			`${pad(d.getUTCMonth() + 1, 2)}-` +
			`${pad(d.getUTCDate(), 2)}`;
		return 'log/' + date + '.log';
	}
}

module.exports = ServerInterface;
