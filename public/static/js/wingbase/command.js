class CommandProcessor {
	constructor() {

	}

	run(command, arg) {
		if (command == 'setname') this.setName(arg);
	}

	setName(name) {
		game.net.send('chat', { msg: ' is now known as ' + name });
		game.net.send('setName', name);
	}
}
