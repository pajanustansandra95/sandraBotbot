

const axios = require('axios');

module.exports.config = {
  name: 'ai3',
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  aliases: ['gpt', 'openai'],
  description: "An AI command powered by GPT-4",
  usage: "Ai [prompt]",
  credits: 'Lorex',
  cooldown: 3,
};

module.exports.run = async function({
  api,
  event,
  args
}) {
  const input = args.join(' ');
  
  if (!input) {
    api.sendMessage(`Hello there!\n\nI am GPT-4 (v3), your advanced AI companion for insightful conversations, creative ideas, and helpful guidance!\n\nusage: ai4 what is love?`, event.threadID, event.messageID);
    return;
  }
  
  api.sendMessage(`Generating...`, event.threadID, event.messageID);
  
  try {
    const response = await axios.get(`https://akhiro-rest-api.onrender.com/api/gpt4?q=${encodeURIComponent(input)}`);
    
    console.log('Response:', response.data); // Log the entire response
    
    if (response.data && response.data.content) {
      let responseData = response.data.content;
      // Prepend "GPT-4" to the beginning of the response
      responseData = "⡷⠂GPT-4 (v3)⠐⢾\n\n" + responseData;
      api.sendMessage(responseData + '', event.threadID, event.messageID);
    } else {
      api.sendMessage('Unable to get a valid response from the AI.', event.threadID, event.messageID);
    }
  } catch (error) {
    console.error('Error:', error);
    api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
  }
};
