class Player {
	constructor(name, team, ship) {
		this.name = name;
		this.team = team;
		this.ship = ship;

		this.lastInputs = [];

		this.interface = [];
	}

	packDelta() {
		// W, A, D, Space
		let inputs = ['w', 'a', 'd'];
		inputs = inputs.map(k => game.input.keys.held[k] || false);
		inputs[3] = game.input.keys.pressed['Spacebar'] || false;
		inputs[4] = game.input.mouse.wx;
		inputs[5] = game.input.mouse.wy;
		inputs[6] = game.input.mouse.held[3];
		inputs[7] = game.input.mouse.pressed[1];
		let delta = this.lastInputs == inputs ? false : inputs;
		this.lastInputs = inputs;
		return delta;
	}
}
