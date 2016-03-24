class Ship extends Body {
	constructor(data) {
		super(data);
		this.player = new Player(data.name, data.team, this);
		this.team = data.team;
		this.name = data.name;
		this.hull = '01';
		this.move = [];
		this.thrust = {};
		this.power = data.power;
		this.mounts = data.mounts;
		this.turrets = data.turrets;
		this.size = {
			'small': 8,
			'medium': 16,
			'large': 24
		}[data.size];
		this.lastMove = [];
		this.bodyType = 'ship';
	}

	updateMove() {
		if (JSON.stringify(this.move) != JSON.stringify(this.lastMove) || true) {
			game.net.update(this.move);
			this.lastMove = Array.apply(0, this.move); // Bloody Javascript.
		}
	}

	updateType(data) {
		this.thrust = {
			forward: data[6]
		}
	}

	tick() {
		if (this.move[0]) {
			var power = this.power.forward;
			var x = Math.cos(this.getPos().r) * power;
			var y = Math.sin(this.getPos().r) * power;
			this.applyForce(x, y);
		}

		if (this.move[1]) {
			this.applyTorque(-this.power.rotation);
		}

		if (this.move[2]) {
			this.applyTorque(this.power.rotation);
		}
	}
}
