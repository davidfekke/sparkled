
var https = require('https'),
	querystring = require('querystring'),
	body = "",
	returnValue = "",
	accessToken = process.env.SPARKACCESSTOKEN; //process.env.SPARKACCESSTOKEN

var httpsOptions = {
	hostname: 'api.particle.io',
	port: 443,
	path: '/v1/devices/' + process.env.DFEKKEELECTRON1 + '/led', //process.env.ZEDDEVICE
	method: 'POST',
	headers: {
		'Accept': '*/*',
		'Accept-Language': 'en-US,en;q=0.8',
		'Accept-Encoding': 'gzip,deflate,sdch',
		'Content-Type': 'application/x-www-form-urlencoded'
	}
};

function callSparkService(postData, res) {
	var post_data = postData;
	httpsOptions.headers['Content-Length'] = post_data.length;
	var retValue = "";
	var request = https.request(httpsOptions, function(response) {
		console.log('STATUS: ' + response.statusCode);
		response.setEncoding('utf8');
		response.on('data', function (chunk) {
			//console.log('BODY: ' + chunk);
			retValue += chunk;
		});
		response.on('end', function() {
			console.log('request has ended.');
			//console.log(body);
			//retValue = JSON.parse(body);
			res.send(retValue);
		});
	});
	
	request.on('error', function(e) {
		console.log('problem with request: ' + e.message);
	});

	// write data to request body
	request.write(post_data);
	request.end();
}

exports.redledon = function (req, res) {
	var post_data = querystring.stringify({
		'access_token': accessToken,
		'params': 'D6,HIGH'
	});
	callSparkService(post_data, res);
};

exports.redledoff = function (req, res) {
	var post_data = querystring.stringify({
		'access_token': accessToken,
		'params': 'D6,LOW'
	});
	callSparkService(post_data, res);
};

exports.greenledon = function (req, res) {
	var post_data = querystring.stringify({
		'access_token': accessToken,
		'params': 'A5,HIGH'
	});
	callSparkService(post_data, res);
};

exports.greenledoff = function (req, res) {
	var post_data = querystring.stringify({
		'access_token': accessToken,
		'params': 'A5,LOW'
	});
	callSparkService(post_data, res);
};