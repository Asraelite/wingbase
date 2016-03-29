class CommandProcessor {
	constructor() {

	}

	run(command, arg) {
		if (command == 'setname') {
			this.setName(arg);
		} else if (command == 'commands') {
			game.gui.chat.addMessage({
				type: 'server',
				message: 'Available commands:<br /> ' +
					'/setname [name]<br /> ' +
					'/commands'
			});
		} else {
			game.gui.chat.addMessage({
				type: 'server',
				message: 'Unrecognised command<br />' +
					'Type /commands for a list'
			});
		}
	}

	setName(name) {
		game.net.send('chat', { msg: ' is now known as ' + name });
		game.net.send('setName', name);
	}
}
