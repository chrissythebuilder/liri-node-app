// to read and set any environment variables with the dotenv package;
require("dotenv").config();

// access the keys.js file and store in a variable

var keys = require("./keys.js");

// "my-tweets"
// node liri.js my-tweets: show your last 20 tweets and when they were created in terminal/bash window
var Twitter = require("twitter");
var client = new Twitter(keys.twitter);

if (process.argv[2] === "my-tweets") {
    function tweetFeed() {
        var params = {screen_name: "hi_itschrissy",
                      count: 20};
        client.get("statuses/user_timeline", params, function(error, tweets, response) {
            if (!error) {
                // console.log(tweets);
                for (var i = 0; i < tweets.length; i++) {
                    var textTweet = tweets[i].text;
                    console.log("Tweet Number: " + [tweets.length-i] + "\nThoughts: " + textTweet);
                    var dateTweet = tweets[i].created_at;
                    console.log("Date Published: " + dateTweet);
                    console.log("\n-----------------------------------------")
                }
                // console.log(response);
            }
        })
    }
    tweetFeed();
}


// "spotify-this-song"
// node liri.js spotify-this-song '<song name here>': this will show the following > artist(s), the song's name, preview link of the song from Spotify, album that the song is from

var Spotify = require("spotify");
var spotify = new Spotify(keys.spotify);

if (process.argv[2] === "spotify-this-song") {
    
    function songFeed(trackQuery) {
        var songName = "";

        for (var i = 3; i < process.argv.length; i++) {
            if (i > 3 && i < process.argv.length) {
                songName = songName + "+" + process.argv[i];
            }
        }

        spotify.search({type: "track", query: trackQuery}, function(error, data) {
            if (!error) {
                console.log("Artist: " + data.artists[0].name + "\nSong: " + data.name + "\nSpotify Preview Link: " + data.preview_url + "\nAlbum Name: " + data.album.name)
            }
        })


    }
    songFeed()
}



// OMDB API

var request = require("request");

if (process.argv[2] === "movie-this") {

    function movieFeed() {

        var movieName = "";

        for (var i = 3; i < process.argv.length; i++) {
            if (i > 2 && i < process.argv.length) {
                movieName = movieName + "+" + process.argv[i];
            }
        }
    
        request("http://www.omdbapi.com/?apikey=329ca5a0&t=" + movieName, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log("Movie Title: " + JSON.parse(body).Title + "\nRelease Year: " + JSON.parse(body).Year + "\nIMDB Rating: " + JSON.parse(body).imdbRating + "\nRotten Tomatoes Rating of the movie: " + JSON.parse(body).Ratings[2].Value + "\nCountry produced: " + JSON.parse(body).Country + "\nLanguage of the movie: " + JSON.parse(body).Language + "\nPlot of the Movie: " + JSON.parse(body).Plot + "\nCast: " + JSON.parse(body).Actors);
            }
        })
    }
    movieFeed();

}

// 

// var fs = require("fs");

// if (process.argv[2] === "do-what-it-says") {
//     function randomText() {

//     }
//     randomText();
// }

