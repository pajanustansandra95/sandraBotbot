
module.exports.config = {
    name: "sim",
    version: "1.0.0",
    role: 0,
    aliases: ["sim"],
    credits: "jerome",
    description: "Talk to sim",
    cooldown: 0,
    hasPrefix: false // Set to false to intercept all messages
};

module.exports.run = async function({ api, event, args }) {
    const axios = require("axios");
    let { messageID, threadID, body, messageReply } = event;
    let tid = threadID, mid = messageID;

    // Function to send replies
    const sendReply = (msg) => api.sendMessage(msg, tid, mid);

    let query = "";

    // Check if the message starts with "sim"
    if (body && body.toLowerCase().startsWith("sim ")) {
        query = body.slice(4).trim(); // Remove the "sim " prefix
    }
    // Check if it's a reply to any message
    else if (messageReply) {
        query = messageReply.body;
    } else {
        // Not a command or a reply
        return;
    }

    if (!query.trim()) {
        sendReply("Please type a message...");
        return;
    }

    const content = encodeURIComponent(query);

    try {
        const response = await axios.get(`https://sim-api-ctqz.onrender.com/sim?query=${content}`);
        if (response.data.error) {
            sendReply(`Error: ${response.data.error}`);
        } else {
            sendReply(response.data.respond);
        }
    } catch (error) {
        console.error("API Request Failed: ", error);
        sendReply("An error occurred while fetching the data.");
    }
};
