const axios = require('axios');

module.exports.config = {
  name: 'copilot',
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  aliases: ['Bing', 'Microsoft'],
  description: "Microsoft Ai assistant",
  usage: "copilot [prompt]",
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
    api.sendMessage(`Hello! I’m Copilot, your AI companion. How can I assist you today? \n\nusage: copilot [text]`, event.threadID, event.messageID);
    return;
  }
  api.sendMessage(`Getting Answers from Microsoft...`, event.threadID, event.messageID);
  try {
    const question = input;
    const apiKey = 'j86bwkwo-8hako-12C';
    
    const { data } = await axios.get('https://liaspark.chatbotcommunity.ltd/@unregistered/api/copilot', {
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
