'use strict'
require('dotenv').config()
var http = require('http')
var server = http.createServer(handle_endpoints)

server.listen(4444)

function handle_endpoints (request, response) {
  if (request.method === 'GET') {
    handle_get_requests()
  } else {
    response.writeHead(404,
      {'Content-Type': 'application/json'})
    response.end('not found')
  }

  function handle_get_requests () {
    if (request.url === '/') {
      console.log('root /')
      get_tweets_from('ID_AA_Carmack')
    } else {
      console.log('another PATH: ' + request.url)
    }
  }

  function get_tweets_from (user) {
    var Twit = require('twitter')

    var twitter = new Twit({
      consumer_key: process.env.tw_key,
      consumer_secret: process.env.tw_secret,
      access_token_key: process.env.tw_token_key,
      access_token_secret: process.env.tw_token_secret
    })

    var params = { screen_name: user }
    // would like to work with a promise-like API - fauno
    // todo: wrap this function 'get_tweets_from' as a promise? - fauno
    twitter.get('statuses/user_timeline', params, work_tweets)

    function work_tweets (error, tweets) {
      if (!error) {
        tweets = tweets.map(just_text_favs_retweets_and_date)
                       .filter(remove_undefined)

        // todo: this response stuff should be outside this function? - fauno
        response.setHeader('Access-Control-Allow-Origin', '*')
        response.setHeader('Access-Control-Allow-Methods', 'GET')
        response.writeHead(200, {'Content-Type': 'application/json'})
        response.end(JSON.stringify(tweets))
      }
    }
  }
}

function remove_undefined (element) {
  if (element === undefined) {
    return false
  } else {
    return true
  }
}

function just_text_favs_retweets_and_date (tweet) {
  if (tweet.favorite_count > 0 || tweet.retweet_count > 0) {
    return {
      id: tweet.id,
      text: tweet.text,
      favorites: tweet.favorite_count,
      retweets: tweet.retweet_count,
      created_at: tweet.created_at
    }
  }
}
