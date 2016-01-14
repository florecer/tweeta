var twit = require('twitter'),
twitter = new twit({
	consumer_key: 'jIcgTm41i8uZSzV7ZvEW0BX3F',
	consumer_secret: 'AHlX3ZolbMDOqTziO3qRuncastZ9ab6hC0MJ9chBi4YJrsT1qr',
	access_token_key: '148858620-0DgXojh4d7TQn8rHB7ZgDVp14FSd98gBBj2XU1Lf',
	access_token_secret: '7LeHvf9A3fCf3NMlTn894tjW5gS4UfvQQ89szHdMomH97'
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