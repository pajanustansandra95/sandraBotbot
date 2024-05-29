
const axios = require('axios');

module.exports.config = {
  name: 'grammarly',
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  aliases: ['grammarly', 'grammar'],
  description: "check grammar, spelling, and style",
  usage: "grammarly [prompt]",
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
    api.sendMessage(`Enhance your writing with Grammarly! Check grammar, spelling, and style effortlessly. Improve clarity and confidence in your communication today.\n\nusage: grammarly (text)`, event.threadID, event.messageID);
    return;
  }
  api.sendMessage(`Checking Grammar...`, event.threadID, event.messageID);
  try {
    const question = input;
    const apiKey = 'j86bwkwo-8hako-12C';
    
    const { data } = await axios.get('https://liaspark.chatbotcommunity.ltd/@unregistered/api/grammarly', {
      params: {
        key: apiKey,
        query: question,
      }
    });
    
    let response = data.message;

    response = " " + response;
    api.sendMessage(response + ' ', event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
  }
};
