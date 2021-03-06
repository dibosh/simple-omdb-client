![mdMovieUtils Logo](https://raw.githubusercontent.com/dibosh/md-movie-utils/master/md-movie-utils-icon.png)

[![Build Status](https://travis-ci.org/dibosh/md-movie-utils.svg?branch=master)](https://travis-ci.org/dibosh/md-movie-utils)
[![all downloads](https://img.shields.io/npm/dt/md-movie-utils.svg)]()


### [md-movie-utils](https://dibosh.github.io/md-movie-utils)

All the movie info extraction utilities in one place. Has built-in,
easy to use OMDB and TMDB clients and more.

#### Setup

`npm install md-movie-utils --save`

#### Usage

- ##### Parsing movie name, year etc. basic info from torrent/plain file names
    
    ```
    let parser = require('md-movie-utils').parser;
    
    // parse Murder on the Orient Express (2017) [BluRay] [1080p].mp4
    parser.parseFromTorrentFileName('Murder on the Orient Express (2017) [BluRay] [1080p].mp4')
    // returns
    {
      "year": 2017,
      "resolution": "1080p",
      "quality": "BluRay",
      "title": "Murder on the Orient Express",
      "excess": [
        "[]",
        "[]"
      ]
    }
    
    // parse Batman Begins (2005)
    parser.parseMovieNameAndYear('Batman Begins (2005)', parser.formats.BRACES_FORMAT);
    // returns
    {
      "movieName": "Batman Begins",
      "year": 2005
    }
    ```
    
- ##### Using Open Movie Database/The Movie Database clients
    
    - Initialize the client using your API key-
        ```
        let movieDBClients = require('md-movie-utils').clients;
        let omdbClient = movieDBClients.OMDBClient.getInstance(<YOUR_API_KEY>);
        let tmdbClient = movieDBClients.MovieDBClient.getInstance(<YOUR_API_KEY>);
        ```
        
    - Get info on any movie using the simple get methods-
        ```
        // NB. You don't need to pass plot & format when using tmdbClient.
        // For detailed instructions, please check the examples or the class
        // documentations.
        
        let movieRequest = {
            title: 'Thor Ragnarok',
            year: 2017,
            format: 'json',
            plot: 'full',
            type: 'movie'
        };
        
        omdbClient/* Or tmdbClient */.get(movieRequest)
            .then((data) => {
                console.log(data); // Thor Ragnarok movie info is here!
            });
                
        // or using the IMDB ID
            
        let movieRequest = {
            imdbID: 'tt2345',
            format: 'json',
            plot: 'full',
            type: 'movie'
        };
        omdbClient/* Or tmdbClient */.get(movieRequest)
            .then((data) => {
                console.log(data); // Movie info is here!
            });
        ```
        
    - Or even simply using the helper methods-
        ```
        
        omdbClient/* Or tmdbClient */.getByTitleAndYear(title, year)
            .then((data) => {
                console.log(data); // Movie info is here!
            });
            
        // or using the IMDB ID
        omdbClient/* Or tmdbClient */.getByIMDBId(imdbID)
            .then((data) => {
                console.log(data); // Movie info is here!
            });
        ```
        
    - You can also search for a movie/series-
        
        ```
        let searchRequest = {
            query: 'Saw'
        };
        omdbClient/* Or tmdbClient */.search(searchRequest)
            .then((data) => {
                console.log(data); // Movie info(s) is here!
            });
        ```
    
#### Examples

Check out the detailed usage [here](https://github.com/dibosh/md-movie-utils/tree/master/example).

To test out the API created in examples, just clone the [repository](https://github.com/dibosh/md-movie-utils) 
and then replace api keys with yours in `md-movie-utils/example/server.js`

Then run the server- `npm install && npm run examples`

The Example API should now be available for testing-

`localhost:3000`
- `/omdb/get?title=Saw&year=2004&type=movie`
- `/omdb/movie/getByTitleAndYear?title=Saw&year=2004`
- `/omdb/series/getByTitleAndYear?title=Saw&year=2004`
- `/omdb/search?q=Batman`
- `/tmdb/get?title=Saw&year=2004&type=movie`
- `/tmdb/movie/getByTitleAndYear?title=Saw&year=2004`
- `/tmdb/series/getByTitleAndYear?title=Saw&year=2004`
- `/tmdb/get/:imdbID`
- `/tmdb/search?q=The Dark Knight`
- `/extract/fromTorrent?fileName=Murder on the Orient Express (2017) [BluRay] [1080p].mp4`
- `/extract/plain?fileName=Murder on the Orient Express (2017) [BluRay] [1080p].mp4&format=DOT_FORMAT`
      
      
#### The MIT License

Copyright 2018 © **Munim Dibosh**

Permission is hereby granted, free of charge, to any person obtaining a copy of this 
software and associated documentation files (the "Software"), to deal in the Software 
without restriction, including without limitation the rights to use, copy, modify, 
merge, publish, distribute, sublicense, and/or sell copies of the Software, and to 
permit persons to whom the Software is furnished to do so, subject to the following 
conditions:

The above copyright notice and this permission notice shall be included in all copies 
or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT 
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF 
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE 
OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
      
        
    
    
