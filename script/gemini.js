const axios = require('axios');

module.exports.config = {
  name: 'gemini',
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  aliases: ['generategemini', 'geminitext'],
  description: "Generate Text using Gemini",
  usage: "gemini [text]",
  credits: 'Lore Dave',
  cooldown: 3,
};

module.exports.run = async function({ api, event, args }) {
  const text = args.join(' ');

  if (!text) {
    api.sendMessage('Please provide some text.', event.threadID, event.messageID);
    return;
  }

  api.sendMessage('Fetching Answers from Google...', event.threadID, event.messageID);

  try {
    const { data } = await axios.get(`https://apis-samir.onrender.com/Gemini?text=${encodeURIComponent(text)}`);

    if (data.candidates && data.candidates.length > 0) {
      const generatedText = data.candidates[0].content.parts.map(part => part.text.replace(/\*/g, '')).join('\n'); // Removing asterisks from each line
      api.sendMessage(generatedText, event.threadID);
    } else {
      api.sendMessage('Failed to generate text. Please try again later.', event.threadID);
    }
  } catch (error) {
    console.error(error); // Log any errors
    api.sendMessage('An error occurred while processing your request.', event.threadID);
  }
};
