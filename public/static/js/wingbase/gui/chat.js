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
			source: messageData.source || '?',
			text: messageData.message,
			createTime: Date.now()
		};

		let span;

		if (message.type == 'server') {
			span = this.gui.createElement(this.messageElement, 'span', {
				html: `${message.text}`
			});
			span.classList.add('server');
		} else {
			span = this.gui.createElement(this.messageElement, 'span', {
				html: `&lt;${message.source.bold()}&gt; ${message.text}`
			});
		}



		setTimeout(_ => {
			//this.messageElement.removeChild(span);
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
