GUI.prototype.Weapons = class {
	constructor(gui) {
		this.gui = gui;

		this.element = this.gui.query('#weapons');
		this.weaponElements = [];
		this.currentWeapon = 0;
	}

	update() {
		let ship = game.world.playerShip;
		if (!ship) return;

		this.element.innerHTML = '';
		ship.fixtures.forEach((fixture, i) => {
			if (!fixture.fixture) return;
			let div = document.createElement('div');
			div.classList.add('weapon');
			if (ship.activeFixture == i)
				div.classList.add('active');
			let img = `url(/img/turrets/${fixture.fixture}/normal.png)`;
			div.style.backgroundImage = img;
			this.element.appendChild(div);
		});
	}

	switchWeapon(slot) {
		this.currentWeapon = 0;
		let el = this.element.querySelector('.weapon.active');
		if (el)
			el.classList.remove('active');
		let weapons = this.element.querySelectorAll('.weapon');
		if (weapons[slot])
			weapons[slot].classList.add('active');
	}
}
