class Ship extends Body {
	constructor(data) {
		console.log(data);
		super(data);
		this.player = new Player(data.name, data.team, this);
		this.team = data.team;
		this.name = data.name;
		this.hull = '01';
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

	updateType(data) {
		this.thrust = {
			forward: data[6]
		}

		this.debug = data[9];
	}

	tick() {
		if (this.thrust.forward) {
			var power = this.power.forward;
			var x = Math.cos(this.getPos().r) * power;
			var y = Math.sin(this.getPos().r) * power;
			this.applyForce(x, y);
		}

		if (this.thrust.left) {
			this.applyTorque(-this.power.rotation);
		}

		if (this.thrust.right) {
			this.applyTorque(this.power.rotation);
		}
	}
}
