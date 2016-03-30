class Player {
	constructor(name, team, ship) {
		this.name = name;
		this.team = team;
		this.ship = ship;

		this.lastDelta = [];

		this.inputInterface = [];
	}

	packDelta() {
		// W, A, D, Space
		let input = game.input;
		let packet = {};

		packet.thrust = ['w', 'a', 'd', 's'].map(k => +input.keys.held[k] || 0);
		packet.fire = [1, 1, 3].map(k => +input.mouse.held[k] || 0);
		packet.aim = [
			+input.mouse.wx.toFixed(2),
			+input.mouse.wy.toFixed(2)
		];
		packet.missile = input.keys.pressed['Spacebar'];

		packet = this.inputInterface.map(i => packet[i]);

		let noDelta = JSON.stringify(this.lastDelta) == JSON.stringify(packet);
		this.lastDelta = packet;
		return noDelta ? false : packet;
	}
}
