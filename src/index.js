import ptn from 'parse-torrent-name';
let clients = require('./clients');

let parser = {
  formats: {
    SPACE_FORMAT: /(.+)\s(\d{4})/,
    BRACES_FORMAT: /(.+)\s?\((\d{4})\)/,
    DOT_FORMAT: /([^.]+)\.(\d{4})/
  }
};

/**
 * Get movie name, year, resolution, quality and different info from a torrent file name.
 * Powered by parse-torrent-name module.
 * @param {string} movieFileName Movie file torrent name
 * @returns {object} The movie info
 */
parser.parseFromTorrentFileName = (movieFileName) => {
  movieFileName = movieFileName.replace(/\.(mp4|mkv|avi|wmv|flv)/, '');
  let rawInfo = ptn(movieFileName);
  if (!rawInfo.title || !rawInfo.year) {
    throw new Error('Movie info parsing failed');
  }

  return rawInfo;
};

/**
 * Get a movie name & year from its filename that complies to certain format
 * @param {string} movieFileName
 * @param format Any of the format value from `parser.formats`
 * @example
 * parser.parse('Batman Begins (2005)', parser.formats.BRACES_FORMAT)
 * @returns {object} An object with movie name & year
 */
parser.parseMovieNameAndYear = (movieFileName, format) => {
  let match = movieFileName.match(format);
  if (match) {
    return {
      movieName: match[1].trim(),
      year: match[2].trim()
    }
  } {
    throw new Error('Failed to parse movie name and year');
  }
};

module.exports = {
  clients: clients,
  parser: parser
};
