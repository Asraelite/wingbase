class DischargeRenderer {
	constructor(renderer) {
		this.pallet = renderer.pallet;
		this.canvas = this.pallet.canvas;
		this.context = this.pallet.context;
	}

	render(discharge) {
		let x = discharge.x * SCALE;
		let y = discharge.y * SCALE;

		let pallet = this.pallet;
		let context = this.context;

		pallet.view(x, y, false, discharge.r);

		pallet.square('#f00', 0, 0, 2);

		pallet.restore();
	}
}
