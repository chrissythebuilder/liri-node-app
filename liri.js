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
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
if (process.argv[2] === "spotify-this-song") {
    
    function songFeed() {
        var songName = "";

        var termSong = process.argv.slice(3).join(" ");
        songName = termSong

        // for (var i = 3; i < process.argv.length; i++) {
        //     if (i > 3 && i < process.argv.length) {
        //         songName = songName + "+" + process.argv[i];
        //     }
        // }
        // songName='havana'
        // console.log('==============')
        // console.log(songName)

        spotify.search({type: "track", query: songName}, function(error, data) {
            console.log(data)
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

        var termMovie = process.argv.slice(3).join(" ");
        movieName = termMovie

        // for (var i = 3; i < process.argv.length; i++) {
        //     if (i > 3 && i < process.argv.length) {
        //         movieName = movieName + "+" + process.argv[i];
        //     }
        // }
    
        request("http://www.omdbapi.com/?apikey=trilogy&t=" + movieName, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log("- Movie Title: " + JSON.parse(body).Title + "\n- Release Year: " + JSON.parse(body).Year + "\n- IMDB Rating: " + JSON.parse(body).imdbRating + "\n- Rotten Tomatoes Rating of the movie: " + JSON.parse(body).Ratings[2].Value + "\n- Country produced: " + JSON.parse(body).Country + "\n- Language of the movie: " + JSON.parse(body).Language + "\n- Plot of the Movie: " + JSON.parse(body).Plot + "\n- Cast: " + JSON.parse(body).Actors);
            }
        })
    }
    movieFeed();

}

// Retrieves data from the random.txt file

var fs = require("fs");

if (process.argv[2] === "do-what-it-says") {
    function randomText() {
        fs.readFile("random.txt", "utf8", function(error,data) {
            if (error) {
                return console.log(error);
            } 
            console.log(data)

            var dataArr = data.split(",");
            console.log(dataArr);
        })
    }
    randomText();
}



// Question 1: Spotify API not working, require ID & Secret still?
// Question 2: Movie generator does not work if movie is only one word