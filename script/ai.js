const axios = require('axios');
module.exports.config = {
  name: 'ai',
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
    api.sendMessage(`Hello there!\n\nI am 𝗟𝗼𝗿𝗲𝘅 𝗔𝗶, your gateway to 𝗚𝗣𝗧-𝟰. I am AI companion for insightful conversations, creative ideas, and helpful guidance!\n\nusage: ai what is love?`, event.threadID, event.messageID);
    return;
  }
  api.sendMessage(`Generating...`, event.threadID, event.messageID);
  try {
    const {
      data
    } = await axios.get(`https://markdevs-last-api-a4sm.onrender.com/gpt4?prompt=${encodeURIComponent(input)}&uid=${event.senderID}`);
    let response = data.gpt4;
    // Prepend "GPT-4" to the beginning of the response
    response = "" + response;
    api.sendMessage(response + '', event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
  }
};
