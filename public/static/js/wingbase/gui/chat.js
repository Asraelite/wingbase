GUI.prototype.Chat = class {
	constructor(gui) {
		this.gui = gui;

		this.messageElement = this.gui.query('#chat-messages');
		this.inputElement = this.gui.query('#chat input');

		this.inputElement.disabled = true;

		this.messages = [];

		this.typing = false;
	}

	addMessage(messageData) {
		let message = {
			type: messageData.type,
			player: messageData.player,
			text: messageData.message,
			createTime: Date.now()
		};

		let span = this.gui.createElement(this.messageElement, 'span', {
			html: message.text
		});

		this.messages.push(message);

		setTimeout(_ => {
			this.messageElement.removeChild(span);
			this.messages.shift();
		}, 15000);
	}

	tick() {
		if (game.input.keys.pressed[13] || game.input.keys.pressed[27]) {
			if (this.typing) {
				if (game.input.keys.pressed[13]) {
					let message = this.inputElement.value;
					this.inputElement.value = '';
					game.net.send('chat', { msg: message });
				}
				this.typing = false;
				this.inputElement.blur();
				this.inputElement.disabled = true;
				game.input.locked = false;
			} else {
				console.log(game.input.locked);
				this.typing = true;
				this.inputElement.disabled = false;
				this.inputElement.focus();
				game.input.locked = true;
			}
		}
	}
}
