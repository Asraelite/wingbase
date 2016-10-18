class Utils {
	static rotatedImage(context, img, x, y, rotation) {
		let w = img.width;
		let h = img.height;

		context.save();
		context.translate(x + w / 2, y + h / 2);
		context.rotate(rotation);
		context.drawImage(img, -w / 2, -h / 2, w, h);
		context.restore();
	}
}
