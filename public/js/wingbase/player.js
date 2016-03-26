class Player {
	constructor(name, team, ship) {
		this.name = name;
		this.team = team;
		this.ship = ship;

		this.lastInputs = [];
	}

	packDelta() {
		// W, A, D, Space
		let inputs = [87, 65, 68];
		inputs = inputs.map(k => game.input.keys.held[k] || false);
		inputs[3] = game.input.keys.pressed[32] || false;
		let delta = this.lastInputs == inputs ? false : inputs;
		this.lastInputs = inputs;
		return delta;
	}
}
