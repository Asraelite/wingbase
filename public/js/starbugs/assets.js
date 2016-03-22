function loadAssets() {
	var sources = {
		images: {
			ships: {
				'01': {
					hull: 'img/ships/01/hull.png',
					teama: 'img/ships/01/teama.png',
					teamb: 'img/ships/01/teamb.png',
					thrust0: 'img/ships/01/thrust0.png',
					thrust5: 'img/ships/01/thrust5.png',
					thrust8: 'img/ships/01/thrust8.png'
				}
			},
			turrets: {
				'01': {
					small: 'img/turrets/01/small.png'
				}
			}
		}
	}

	var result = {};

	// Magical recursive magic.
	(function r(o, t) {
		for (var i in o) {
			if (typeof o[i] == 'string') {
				t[i] = new Image();
				t[i].src = o[i];
			} else {
				t[i] = {};
				r(o[i], t[i]);
			}
		}
		t = o;
	})(sources, result);

	return result;
}
