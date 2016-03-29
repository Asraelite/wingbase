GUI.prototype.Weapons = class {
	constructor(gui) {
		this.gui = gui;

		this.element = this.gui.query('#weapons');
		this.weaponElements = [];
		this.currentWeapon = 0;
	}

	update() {
		
	}

	switchWeapon(slot) {
		this.currentWeapon = 0;
	}
}
