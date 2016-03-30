Game.prototype.loadAssets = _ => {
	let sources = {
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
					'0': 'img/turrets/01/0.png'
				},
				'02': {
					'0': 'img/turrets/02/0.png',
					'1': 'img/turrets/02/1.png'
				}
			},
			projectiles: {
				'02': 'img/projectiles/02.png'
			},
			backgrounds: {
				'01': 'img/space.jpg'
			}
		}
	}

	let result = {};

	// Magical recursive magic.
	(function r(o, t) {
		for (let i in o) {
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
