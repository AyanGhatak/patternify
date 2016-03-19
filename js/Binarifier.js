// converts an image to binary.

function Binarifier (){}

Binarifier.prototype.constructor = Binarifier;

Binarifier.prototype.init = function (canvasElem, grayScaleAlgo) {
	var binarify = this;
	binarify.canvasElem = canvasElem;
	binarify.ctx = canvasElem.getContext("2d");
	binarify.histogram = binarify.histogram();
	binarify.grayScaler = binarify.grayScaler(grayScaleAlgo);
	binarify.dimensions = binarify.dimensions();
};
// Converts the image to its grayscale equivalent.
Binarifier.prototype.grayScaler = function () {
	var binarify = this,
		algo = binarify.grayScaleAlgo.call(binarify, arguments[0]),
		histogram = binarify.histogram,
		converter = function (colorArr, forcedAlgo) {
			var gray = histogram.addItem(forcedAlgo ? forcedAlgo(colorArr) : algo(colorArr));
			colorArr[0] = colorArr[1] = colorArr[2] = gray;
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

Binarifier.prototype.otsu = function (histogram, total) {
	var mB,
    	mF,
    	sum = 0,
    	sumB = 0,
    	wB = 0,
    	wF = 0,
    	max = 0.0,
    	between = 0.0,
    	threshold1 = 0.0,
    	threshold2 = 0.0;
    
    for (var i = 1; i < 256; ++i)
        sum += i * histogram[i];
    
    for (var i = 0; i < 256; ++i) {
        wB += histogram[i];
        if (wB == 0)
            continue;
        wF = total - wB;
        if (wF == 0)
            break;
        sumB += i * histogram[i];
        mB = sumB / wB;
        mF = (sum - sumB) / wF;
        between = wB * wF * (mB - mF) * (mB - mF);
        if ( between >= max ) {
            threshold1 = i;
            if ( between > max ) {
                threshold2 = i;
            }
            max = between;            
        }
    }
    return ( threshold1 + threshold2 ) / 2.0;
};

Binarifier.prototype.histogram = function () {
	var i,
		histogramArr = Array(256);
	for (i = 0; i < 256; ++i) {
		histogramArr[i] = 0;
	}
	return {
		addItem: function (gray) {
			histogramArr[Math.round(gray)] += 1;
			return gray;
		},
		get: function () {
			return histogramArr;
		}
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
	var i,
		binarify = this,
		ctx = binarify.ctx,
		dimensions = binarify.dimensions.get(),
		data = imageData.data,
		len = data.length,
		histogram = binarify.histogram.get(),
		threshold = binarify.otsu(histogram, len / 4);
	for (i = 0; i < len; i += 4) {
		data[i] = data[i + 1] = data[i + 2] = data[i] >= threshold ? 255 : 0;
	  // opacity 255 = 100%
	  data[i + 3] = 255;
	}
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