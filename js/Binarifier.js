// converts an image to binary.

function Binarifier (){}

Binarifier.prototype.constructor = Binarifier;

Binarifier.prototype.init = function (canvasElem, grayScaleAlgo) {
	var binarify = this;
	binarify.canvasElem = canvasElem;
	binarify.ctx = canvasElem.getContext("2d");
	binarify.grayScaler = binarify.grayScaler(grayScaleAlgo);
	binarify.dimensions = binarify.dimensions();
};
// Converts the image to its grayscale equivalent.
Binarifier.prototype.grayScaler = function () {
	var binarify = this,
		algo = binarify.grayScaleAlgo.call(binarify, arguments[0]),
		converter = function (colorArr, forcedAlgo) {
			colorArr[0] = colorArr[1] = colorArr[2] = (forcedAlgo ? forcedAlgo(colorArr) : algo(colorArr));
			return colorArr;
		};
	return function (forcedAlgo) {
		var i,
			binarify = this,
			imageData = binarify.getImageData(),
			data = imageData.data,
			len = data.length;
		for (i = 0; i < len; i += 4) {
			convertedArr = converter(data.slice(i, i + 4), algo);
			for (j = 0; j < 4; j += 1) {
				data[(i+j)] = convertedArr[j];
			}
		}
		binarify.putImageData(imageData)
	}
};

Binarifier.prototype.grayScaleAlgo = function (defaultAlgoName) {
	var algo = {
		'averaging': function (colorArr) {
			return (colorArr[0] + colorArr[1] + colorArr[2]) / 3;
		},
		'luminance': function (colorArr) {
			return (colorArr[0] * 0.299 + colorArr[1] * 0.587 + colorArr[2] * 0.114);
		},
		'desaturation': function (colorArr) {
			var red = colorArr[0],
				green = colorArr[1],
				blue = colorArr[2];
			return (Math.max(red, green, blue) + Math.min(red, green, blue)) / 2
		}
	}
	!defaultAlgoName && (defaultAlgoName = 'luminance');
	return algo[defaultAlgoName];	
};

Binarifier.prototype.getImageData = function () {
	var binarify = this,
		ctx = binarify.ctx,
		dimensions = binarify.dimensions.get();
	return ctx.getImageData(dimensions.x, dimensions.y, dimensions.width, dimensions.height);
};

Binarifier.prototype.putImageData = function (imageData) {
	var binarify = this,
		ctx = binarify.ctx,
		dimensions = binarify.dimensions.get();
	return ctx.putImageData(imageData, dimensions.x, dimensions.y);
};

Binarifier.prototype.dimensions = function () {
	var binarify = this,
		canvasElem = binarify.canvasElem,
		height = canvasElem.height,
		width = canvasElem.width,
		x = 0,
		y = 0;
	return {
		set: function (config) {
			config.height && (height = config.height);
			config.width && (width = config.width);
			config.x && (x = config.x);
			config.y && (y = config.y);
		},
		get: function () {
			return {
				height: height,
				width: width,
				x: x,
				y: y
			}
		}
	}
}