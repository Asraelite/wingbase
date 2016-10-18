function Pallet(canvas, options) {
	var self = this;

	options = options || {};

	if(typeof canvas == 'string') {
		canvas = document.getElementById(canvas.replace('#', ''));
	} else if(!canvas) {
		canvas = document.getElementsByTagName('canvas')[0];
		if(!canvas) return false;
	} else if(canvas.tagName != 'CANVAS') {
		return false;
	}

	var context = canvas.getContext('2d');

	this.canvas = canvas;
	this.context = context;

	if (!context.imageSmoothingEnabled) {
		context.webkitImageSmoothingEnabled = options.imageSmoothing || true;
		context.mozImageSmoothingEnabled = options.imageSmoothing || true;
	} else {
		context.imageSmoothingEnabled = options.imageSmoothing || true;
	}

	context.save();

	// Render single colour unstroked circle.
	this.circle = function(color, x, y, radius) {
		context.fillStyle = color;
		context.beginPath();
		context.arc(x, y, radius, 0, Math.PI * 2, false);
     	context.fill();
	};

	// Clear canvas.
	this.clear = function(x, y, w, h, color) {
		if (!h) {
			context.clearRect(0, 0, canvas.width, canvas.height);
		} else {
			context.clearRect(x, y, w, h);
		}
	};

	this.clipRect = function(x, y, w, h) {
		this.context.beginPath();
		this.context.rect(x, y, w, h);
		this.context.clip();
		this.context.closePath();
	};

	// Returns the entire canvas as a base64-encoded image string.
	this.dataURL = function() {
		return canvas.toDataURL();
	}

	// Fill screen with color.
	this.fill = function(color) {
		context.fillStyle = color;
		context.fillRect(0, 0, canvas.width, canvas.height);
	}

	// Resize canvas to window.
	this.fillScreen = function(minX, minY) {
		canvas.width = Math.max(window.innerWidth, minX || 0);
		canvas.height = Math.max(window.innerHeight, minY || 0);
		canvas.style.width = canvas.width + 'px';
		canvas.style.height = canvas.height + 'px';

		self.normalizeSize();
	};

	// Draw image. If only width is given, it will be used a scale factor.
	this.image = function (image, x, y, rotation, w, h) {
		if (typeof image == 'string') {
			var src = image;
			var img = new Image();
			img.src = src;
		} else {
			var src = image.src;
			var img = image;
		}

		if (w && !h) {
			w = img.width * w;
			var h = img.height * w;
		} else {
			var w = w || img.width;
			var h = h || img.height;
		}

		x = x || 0;
		y = y || 0;
		rotation = rotation || 0;

		if (rotation) {
			context.save();
			context.translate(x + w / 2, y + h / 2);
			context.rotate(rotation);
			context.drawImage(img, -w / 2, -h / 2, w, h);
			context.restore();
		} else {
			context.drawImage(img, x, y, w, h);
		}
	};

	// Set canvas size to canvas element size.
	this.normalizeSize = function() {
		var style = window.getComputedStyle(canvas, null);

		canvas.width = +style.width.replace('px', '');
		canvas.height = +style.height.replace('px', '');

		context.save();
	};

	// Set default opacity.
	this.opacity = function(alpha) {
		alpha = alpha || 1;
		context.globalAlpha = alpha;
	};

	// Draw rectangular outline.
	this.outline = function(color, x, y, w, h, s) {
		context.strokeStyle = color;
		context.lineWidth = s || 1;
		context.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
	};

	// Render single colour unstroked rectangle.
	this.rect = function(color, x, y, w, h) {
		context.fillStyle = color;
		context.fillRect(x, y, w, h);
	};

	// Restore canvas then save again.
	this.reset = function() {
		context.restore();
		context.save();
	};

	// Resize canvas.
	this.resize = function(w, h) {
		h = h || canvas.width;

		canvas.width = w;
		canvas.height = h;
		canvas.style.width = w + 'px';
		canvas.style.height = h + 'px';
	}

	// Just restore.
	this.restore = function() {
		context.restore();
	};

	this.save = function() {
		context.save();
	};

	// Render rect with equal sides.
	this.square = function(color, x, y, l) {
		self.rect(color, x, y, l, l);
	};

	// Render text.
	this.text = function(string, x, y, color, font, size, align, baseline) {
		context.fillStyle = color || '#fff';
		if(+size == '' + size) size = size + 'px';
		context.font = size + ' ' + font;
		context.textAlign = align || 'left';
		context.textBaseline = baseline || 'top';
		context.fillText(string, x, y);
	};

	// Transform canvas.
	this.view = function (x, y, zoom, rotation) {
		context.save();
		context.translate(x, y);
		context.rotate(rotation);
		if (zoom) this.context.scale(zoom, zoom);
	}
}
