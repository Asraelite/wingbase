class Effect {
	constructor(data) {
		for (var i in data) {
			this[i] = data[i];
		}

		this.particles = new Set();
		this.pallet = game.renderer.pallet;

		if (this.type == 'explosion') {
			this.createExplosion();
		} else if (this.type == 'rope') {
			this.createRope();
			this.pos = {
				x: 0,
				y: 0
			};
		} else {

		}
	}

	generateParticles(_x, _y, radius, number, colors, sizes, bhv, lf, vel) {
		for (var i = 0; i < number; i++) {
			let x = _x + (Math.random() - 0.5) * radius * 2;
			let y = _y + (Math.random() - 0.5) * radius * 2;
			let color = colors[Math.random() * colors.length | 0];
			let size = sizes[Math.random() * sizes.length | 0];
			let angle = Math.random() * Math.PI * 2;
			let v = Math.random() * vel + 0.1;
			let xvel = Math.cos(angle) * v + (Math.random() - 0.5);
			let yvel = Math.sin(angle) * v + (Math.random() - 0.5);
			let p = new Particle(this, x, y, xvel, yvel, color, size, bhv, lf);
			this.particles.add(p);
		}
	}

	render() {
		let x = this.pos.x * SCALE;
		let y = this.pos.y * SCALE;
		let vx = -game.world.getCenter().x;
		let vy = -game.world.getCenter().y;
		this.pallet.view(x + vx, y + vy, false, 0);

		this.particles.forEach(p => {
			p.render();
			p.tick();
		});

		if (this.particles.size == 0 && !this.keepAlive) {
			game.renderer.effects.delete(this);
		}

		rope: if (this.type == 'rope') {
			let bd = game.world.bodies;
			if (!bd[this.bodyA.id] || !bd[this.bodyB.id]) {
				this.keepAlive = false;
				break rope;
			}
			let p1 = this.posA;
			let p2 = this.posB;
			let posA = this.bodyA.b2body.GetWorldPoint(new b2Vec2(p1.x, p1.y));
			let posB = this.bodyB.b2body.GetWorldPoint(new b2Vec2(p2.x, p2.y));
			let context = this.pallet.context;
			context.beginPath();
			context.moveTo(posA.x * SCALE, posA.y * SCALE);
			context.lineTo(posB.x * SCALE, posB.y * SCALE);
			context.strokeStyle = '#555';
			context.stroke();

		}

		this.pallet.restore();
	}

	// Effect generation.

	createExplosion() {
		let num = this.size * this.size;
		let colors = ['#f52', '#ff7'];
		let b = 'sizzle';
		this.generateParticles(0, 0, 1, num, colors, [1, 2], b, 50, 3);
	}

	createRope() {
		this.bodyA = game.world.bodies[this.bodyA];
		this.bodyB = game.world.bodies[this.bodyB];
		if (!this.bodyA || !this.bodyB) return;
		this.keepAlive = true;

	}
}
