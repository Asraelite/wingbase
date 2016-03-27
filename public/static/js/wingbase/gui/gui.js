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

	tick() {
		this.chat.tick();
	}

	set visible(visible) {
		this.guiElement.style.display = visible ? 'block' : 'hidden';
	}
}
