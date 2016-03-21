function Renderer() {
	var self = this;

	var canvas = document.getElementsByTagName('canvas')[0];
	var context = canvas.getContext('2d');
	var pallet = new Pallet();

	this.render = function(state) {
		if (state == 'connecting' || state == 'disconnected') {
			pallet.clear();
			pallet.fill('#111');
			var str = state == 'connecting' ? 'Connecting' : 'Shit\'s ' +
			'diconnected, yo!';
			pallet.text(str, canvas.width / 2, canvas.height / 2, '#fff', 'FreePixel', 16, 'center', 'middle');
			return;
		}

		pallet.clear();
		pallet.fill('#000');
	}

	pallet.fillScreen();
	window.addEventListener('resize', pallet.fillScreen);
}
