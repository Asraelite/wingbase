class Player {
	constructor(name, team, ship) {
		this.name = name;
		this.team = team;
		this.ship = ship;

		this.lastInputs = {};

		this.inputInterface = [];
	}

	packDelta() {
		// W, A, D, Space
		let input = game.input;
		let packet = {};

		packet.thrust = ['w', 'a', 'd', 's'].map(k => input.keys.held[k] || 0);
		packet.fire = input.mouse.pressed[3] ? [1, 1] : [0, 0];
		packet.aim = {
			x: input.mouse.wx,
			y: input.mouse.wy
		};
		packet.missile = input.keys.pressed['Spacebar'];

		packet = this.inputInterface.map(i => packet[i]);
		window.q = packet;

		let delta = this.lastInputs == packet ? false : packet;
		this.lastInputs = packet;
		return delta;
	}
}
