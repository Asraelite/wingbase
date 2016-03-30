class Asteroid extends Body {
	constructor(data) {
		super(data)
		this.bodyType = 'asteroid';
		this.debug = 0;
	}

	updateType(data) {
		//this.debug = data.debug;
	}

	tickType() {
		
	}
}
