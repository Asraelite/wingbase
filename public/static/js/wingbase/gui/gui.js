//@10

class GUI {
	constructor() {
		this.guiElement = document.getElementById('gui');

		this.chat = new this.Chat(this);
	}

	createElement(parent, type, data) {
		let el = document.createElement(type);
		el.innerHTML = data.html;
		parent.appendChild(el);
		return el;
	}

	query(selector) {
		let result = this.guiElement.querySelectorAll(selector);
		return result.length == 1 ? result[0] : result;
	}

	format() {
		let args = Array.from(arguments);
		let text = args.shift();
		let element = args.shift();
		let string = `<${element} class="${args.join(' ')}">`;
		string += `${text}</${element}>`;
		return string;
	}

	tick() {
		this.chat.tick();
	}

	set visible(visible) {
		this.guiElement.style.display = visible ? 'block' : 'hidden';
	}
}
