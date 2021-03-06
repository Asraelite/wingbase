GUI.prototype.Chat = class {
	constructor(gui) {
		this.gui = gui;

		this.element = this.gui.query('#chat');
		this.messageElement = this.gui.query('#chat-messages');
		this.inputElement = this.gui.query('#chat input');

		this.inputElement.disabled = true;

		this.messages = [];

		this.typing = false;
	}

	addMessage(messageData) {
		let message = {
			type: messageData.type,
			team: messageData.team || 'c',
			source: messageData.source || '?',
			text: messageData.message,
			createTime: Date.now()
		};

		let span;
		let atBottom = this.element.scrollTop == this.element.scrollHeight;

		if (message.type == 'server') {
			span = this.gui.createElement(this.messageElement, 'span', {
				html: `${message.text}`
			});
			span.classList.add('server');
		} else {
			let el = `<span class="team${message.team}">`
			span = this.gui.createElement(this.messageElement, 'span', {
				html: `&lt;${el}${message.source}</span>&gt; ${message.text}`
			});
		}

		if (atBottom)
			this.element.scrollTop = this.element.scrollHeight;

		setTimeout(_ => {
			span.classList.add('old');
		}, 5000);

		setTimeout(_ => {
			this.messageElement.removeChild(span);
		}, 200000);
	}

	tick() {
		let keys = game.input.keys;
		if (keys.pressed['Enter'] || keys.pressed['Esc']) {
			if (this.typing) {
				if (keys.pressed['Enter']) {
					let message = this.inputElement.value;
					this.inputElement.value = '';
					if (message[0] == '/') {
						let args = message.split(' ');
						game.command(args[0].slice(1), args.splice(1).join(' '));
					} else {
						game.net.send('chat', { msg: message });
					}
				}
				this.typing = false;
				this.inputElement.blur();
				this.messageElement.classList.add('inactive');
				this.inputElement.disabled = true;
				game.input.locked = false;
			} else {
				this.typing = true;
				this.inputElement.disabled = false;
				this.inputElement.focus();
				this.messageElement.classList.remove('inactive');
				this.element.scrollTop = this.element.scrollHeight;
				game.input.locked = true;
			}
		}
	}
}
