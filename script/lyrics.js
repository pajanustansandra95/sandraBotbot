const axios = require('axios');

module.exports.config = {
  name: 'lyrics',
  version: '1',
  role: 0,
  credits: 'Grey',
  hasPrefix: true,
  description: 'Lyrics Finder',
  commandCategory: 'fun',
  usage: '[song]',
  cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
  const song = args.join(' ');

  if (!song) {
    return api.sendMessage('Please enter a song.', event.threadID, event.messageID);
  } else {
    axios.get(`https://markdevs-last-api-cvxr.onrender.com/search/lyrics?q=${encodeURIComponent(song)}`)
      .then(res => {
        const { lyrics, title, artist } = res.data.result;

        const message = `Title: ${title}\n\nArtist: ${artist}\n\nLyrics: ${lyrics}`;
        api.sendMessage(message, event.threadID, event.messageID);
      })
      .catch(error => {
        console.error('Lyrics API error:', error);
        api.sendMessage('Failed to fetch lyrics.', event.threadID, event.messageID);
      });
  }
};
