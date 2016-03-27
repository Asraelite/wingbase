'use strict';

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
		console.log(timestamp.gray, msg);
	}

	debug(msg) {
		this.log(msg.cyan);
	}
}

module.exports = ServerInterface;
