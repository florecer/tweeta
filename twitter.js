var twit = require('twitter'),
twitter = new twit({
	consumer_key: 'j9oOEA0vk2LdnBYHQf5O4W77N',
	consumer_secret: 'HP2NvDuSV1idTUqXv0gnvXhiv1axYE0ODuY4q3wqcdZoBsLI3d',
	access_token_key: '148858620-5Ow0kfYATtyu1Z43lEvOX7XpMTKJPFCbWM5ux0zW',
	access_token_secret: 'wQbHPc0dMKWg1CK54Su4aqfRZleqZBJnd7PK0NcSUgTxu'
});


var	util = require('util');

twitter.stream('statuses/filter', {track: 'sex'}, function(stream){ //Filter by a word
//twitter.stream('statuses/sample', {}, function(stream){ 
	stream.on('data', function(data){
		console.log(util.inspect(data));
		//console.log(data.text);
		console.log('\n\n' + data);
		stream.destroy();
		process.exit(0); //End node process
	});

	stream.on('error', function(error){
		throw error;
	});
});