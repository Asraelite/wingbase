'use strict';

const fruit = ['Apple', 'Banana', 'Pear', 'Plum', 'Pineapple', 'Peach', 'Apricot', 'Orange', 'Triangle', 'Kiwi', 'Mango', 'Strawberry', 'Lemon', 'Blueberry', 'Raspberry', 'Grape', 'Dragonfruit', 'Watermelon', 'Honeymelon', 'Pomegranate', 'Cherry', 'Avocado'];

class Player {
	constructor(connection) {
		this.room = false;
		this.ship = false;
		this.team = false;
		this.kickCount = 0;
		this.connection = connection;
		this.name = `Stupid ${fruit[Math.random() * fruit.length | 0]}`;
		this.delta = {};
	}

	disconnect() {
		this.room.remove(this);
	}

	sendUpdate() {
		if (Object.keys(this.delta).length == 0) return;
		this.connection.send('update', this.delta);
		this.delta = {};
	}
}

module.exports = Player;
