const axios = require('axios');

module.exports.config = {
  name: 'gpt5',
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  aliases: ['gpt', 'openai'],
  description: "GPT-5 offers context-aware, empathetic interactions, integrating real-time updates and multimodal",
  usage: "gpt5 [prompt]",
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
    api.sendMessage(`Welcome to GPT-5, your advanced digital companion. Ready to explore, learn, and assist you on your journey through the digital realm\n\nusage: gpt5 what is love?`, event.threadID, event.messageID);
    return;
  }
  api.sendMessage(`Generating...`, event.threadID, event.messageID);
  try {
    const question = input;
    const apiKey = 'j86bwkwo-8hako-12C';
    
    const { data } = await axios.get('https://liaspark.chatbotcommunity.ltd/@unregistered/api/gpt-5', {
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
