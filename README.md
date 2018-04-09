#LIRI - Language Interpretation and Recognition Interface

## Introduction
LIRI is like SIRI (from iOS).  It is a command line node app that takes in parameters and outputs data.

## Setup
#### 0. Clone the repo

#### 1. Run npm install, and the following packages should be installed:

* [twitter](https://www.npmjs.com/package/twitter)
* [spotify](https://www.npmjs.com/package/spotify)
* [request](https://www.npmjs.com/package/request)
	* The request npm package will be used to hit the OMDB API
		* [OMDB API](http://www.omdbapi.com)

#### 2. Get your Twitter API credentials by following these steps (you must have a Twitter account and be logged in):

* Step One: go to https://apps.twitter.com/app/new and fill out and submit the form
* Step Two: go to Keys and Access Tokens to get your consumer key and consumer secret
* Step Three: then click the button below on that page to create an access token and access token secret

#### 3. Create a .env file and store it somewhere safe (you will need to reference it):

* Inside the .env file, insert the following code:

``` JavaScript

# Spotify API keys

SPOTIFY_ID='your Spotify ID'
SPOTIFY_SECRET='your Spotify secret ID'

# Twitter API keys

TWITTER_CONSUMER_KEY='your Twitter consumer key'
TWITTER_CONSUMER_SECRET='your Twitter consumer secret key'
TWITTER_ACCESS_TOKEN_KEY='your Twitter access token key'
TWITTER_ACCESS_TOKEN_SECRET='your Twitter token secret key'

```
#### 4. Inside liri.js, enter your Twitter username in the myTweets function to retrieve your last 20 tweets

``` JavaScript

    if (!twitterUsername) {
        twitterUsername = "your Twitter username";
    }

```

## Run the application
* To install globally:
```
npm install -g
```
The syntax to run the program is:
```
liri <function> <parameter>
```

Available functions:
* my-tweets

* spotify-this-song

* movie-this

* do-what-it-says

Running the following commands in your terminal will do the following:

```
liri my-tweets
```
* will log your last 20 tweets and when they were created

```
liri spotify-this-song 'song name'
```

* log the following information about the song:

	* artist(s)
	* song name
	* preview link of the song from spotify
	* album that the song is a part of
	* song name

* if no song is provided then the program will output information for the song 'What's My Age Again?' by Blink 182 by default

```
liri movie-this <movie name>
```

* this would log the following information about the movie:

	* Title
	* Year
	* IMDB Rating
	* Country
	* Language
	* Plot
	* Actors
	* Rotten Tomatoes Rating
	* Rotten Tomatoes URL

* if no movie is provided, then the program will output information for the movie 'Mr. Nobody' by default

```
liri do-what-it-says
```

* The program will take the text inside of random.txt and use it to call the first command with the second part as it's parameter

* Currently in random.txt, the following text is there:

```
spotify-this-song, "I Want It That Way"
```

* This would call the spotifyThis function and pass in "I Want It That Way" as the song.

* All commands and output are logged in the terminal and log.txt.

# Copyright
(C) Will Fisher 2018. All Rights Reserved.