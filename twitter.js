var twit = require('twitter'),
twitter = new twit({
	consumer_key: '',
	consumer_secret: '',
	access_token_key: '',
	access_token_secret: ''
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
