// Node module imports needed to run the functions
var dotenv = require('dotenv').config()
var fs = require("fs");
var request = require("request");
var keys = require("./keys.js");
var twitter = require("twitter");
var Spotify = require("node-spotify-api");
var liriArgument = process.argv[2];

var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET,
});

// ---------------------------------------------------------------------------------------------------------------
// LIRI Commands
switch (liriArgument) {
    case "my-tweets": myTweets(); break;
    case "spotify-this-song": spotifyThisSong(); break;
    case "movie-this": movieThis(); break;
    case "do-what-it-says": doWhatItSays(); break;

    // Instructions displayed in terminal
    default: console.log("\r\n" + "Type one of the following commands after 'node liri.js' : " + "\r\n" +
        "1. my-tweets 'any twitter name' " + "\r\n" +
        "2. spotify-this-song 'any song name' " + "\r\n" +
        "3. movie-this 'any movie name' " + "\r\n" +
        "4. do-what-it-says." + "\r\n" +
        "Be sure to put the movie or song name in quotation marks if it's more than one word.");
};

// ---------------------------------------------------------------------------------------------------------------
// FUNCTIONS ***
// ---------------------------------------------------------------------------------------------------------------

// MY-TWEETS function: Uses the Twitter module to call the Twitter API
function myTweets() {
    var client = new twitter(keys.twitter);

    var twitterUsername = process.argv[3];
    if (!twitterUsername) {
        twitterUsername = "fireatwillrva";
    }
    params = { screen_name: twitterUsername };
    client.get("statuses/user_timeline/", params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                // console.log(response); // Show the full response in the terminal
                var twitterResults =
                    "@" + tweets[i].user.screen_name + ": " +
                    tweets[i].text + "\r\n" +
                    tweets[i].created_at + "\r\n" +
                    "------------------------------ " + i + " ------------------------------" + "\r\n";
                console.log(twitterResults);
                log(twitterResults); // calling log function
            }
        } else {
            console.log("Error :" + error);
            return;
        }
    });
}

// MOVIE-THIS function: Uses the Request module to grab data from the OMDB API
function movieThis() {
    var movie = process.argv[3];
    if (!movie) {
        movie = "Mr. Nobody";
    }
    params = movie
    request("http://www.omdbapi.com/?t=" + params + "&y=&plot=short&r=json&tomatoes=true&apikey=cb3abd01", function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var movieObject = JSON.parse(body);
            // console.log(movieObject); // Show the text in the terminal
            var movieResults =
                "-------------------------------- begin --------------------------------" + "\r\n" +
                "Title: " + movieObject.Title + "\r\n" +
                "Year: " + movieObject.Year + "\r\n" +
                "Imdb Rating: " + movieObject.imdbRating + "\r\n" +
                "Country: " + movieObject.Country + "\r\n" +
                "Language: " + movieObject.Language + "\r\n" +
                "Plot: " + movieObject.Plot + "\r\n" +
                "Actors: " + movieObject.Actors + "\r\n" +
                "Rotten Tomatoes Rating: " + movieObject.tomatoRating + "\r\n" +
                "Rotten Tomatoes URL: " + movieObject.tomatoURL + "\r\n" +
                "-------------------------------- fin --------------------------------" + "\r\n";
            console.log(movieResults);
            log(movieResults); // calling log function
        } else {
            console.log("Error :" + error);
            return;
        }
    });
};

// SPOTIFY-THIS-SONG function: Uses the Spotify module to call the Spotify API
function spotifyThisSong(songName) {
    var songName = process.argv[3];
    if(!songName){
        songName = "What's my age again";
    }
    params = songName;
    spotify.search({ type: "track", query: params }, function(error, data) {
        if(!error){
            var songInfo = data.tracks.items;
            for (var i = 0; i < 5; i++) {
                if (songInfo[i] != undefined) {
                    var spotifyResults =
                    "Artist: " + songInfo[i].artists[0].name + "\r\n" +
                    "Song: " + songInfo[i].name + "\r\n" +
                    "Album the song is from: " + songInfo[i].album.name + "\r\n" +
                    "Preview Url: " + songInfo[i].preview_url + "\r\n" + 
                    "------------------------------ " + i + " ------------------------------" + "\r\n";
                    console.log(spotifyResults);
                    log(spotifyResults); // calling log function
                }
            }
        }	else {
            console.log("Error :"+ error);
            return;
        }
    });
};

// DO-WHAT-IT-SAYS function: Uses the Read & Write module to access the random.txt file and do what's written in it
function doWhatItSays() {
    fs.readFile('random.txt', 'utf8', function(error, data) {
        if (!error) {
            var dataArr = data.split(',');
            if (dataArr[0] === 'spotify-this-song') {
                spotifyThisSong(dataArr[1]);
            }
            if (dataArr[0] === 'movie-this') {
                movieThis(dataArr[1]);
            }
            if (dataArr[0] === 'my-tweets') {
                myTweets(dataArr[1]);
            }
        }
        else {
            console.log("Error :"+ error);
        }
    });
}

// Log function: Uses the Read & Write module to access the log.txt file and write everything that returns in terminal in the log.txt file
function log(logResults) {
    fs.appendFile("log.txt", logResults, (error) => {
        if (error) {
            throw error;
        }
    });
}