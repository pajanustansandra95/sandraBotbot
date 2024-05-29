module.exports.config = {
  name: 'help',
  version: '1.0.0',
  role: 0,
  hasPrefix: true,
  aliases: ['info'],
  description: "Beginner's guide",
  usage: "Help [page] or [command]",
  credits: 'Develeoper',
};
module.exports.run = async function({
  api,
  event,
  enableCommands,
  args,
  Utils,
  prefix
}) {
  const input = args.join(' ').trim();
  try {
    const eventCommands = enableCommands[1].handleEvent;
    const commands = enableCommands[0].commands;
    
    // Fetch user's name
    const user = await api.getUserInfo(event.senderID);
    const userName = user[event.senderID].name;
    
    if (!input) {
      let helpMessage = `Hey ${userName}, these are commands that may help you:\n\n╭─❍「 COMMAND LIST 」\n`;
      commands.forEach((cmd, i) => {
        helpMessage += `│ ✧ ${prefix}${cmd}\n`;
      });
      helpMessage += `╰───────────⟡\n`;
      helpMessage += `╭─❍「 EVENT COMMANDS 」\n`;
      eventCommands.forEach((eventCmd, i) => {
        helpMessage += `│ ✧ ${prefix}${eventCmd}\n`;
      });
      helpMessage += `╰───────────⟡\n`;
      helpMessage += `To view information about a specific command, type '${prefix}help command name'.\n\n𝙀𝙙𝙪𝙘𝙖𝙩𝙞𝙤𝙣𝙖𝙡 𝘽𝙤𝙩`;
      api.sendMessage(helpMessage, event.threadID, event.messageID);
    } else {
      const command = [...Utils.handleEvent, ...Utils.commands].find(([key]) => key.includes(input?.toLowerCase()))?.[1];
      if (command) {
        const {
          name,
          version,
          role,
          aliases = [],
          description,
          usage,
          credits,
          cooldown,
          hasPrefix
        } = command;
        const roleMessage = role !== undefined ? (role === 0 ? 'Permission: user' : (role === 1 ? 'Permission: admin' : (role === 2 ? 'Permission: thread Admin' : (role === 3 ? 'Permission: super Admin' : '')))) : '';
        const aliasesMessage = aliases.length ? `Aliases: ${aliases.join(', ')}\n` : '';
        const descriptionMessage = description ? `Description: ${description}\n` : '';
        const usageMessage = usage ? `Usage: ${usage}\n` : '';
        const creditsMessage = credits ? `Credits: ${credits}\n` : '';
        const versionMessage = version ? `Version: ${version}\n` : '';
        const cooldownMessage = cooldown ? `Cooldown: ${cooldown} second(s)\n` : '';
        const message = `「 Command Detail 」\n\nName: ${name}\n${versionMessage}${roleMessage}\n${aliasesMessage}${descriptionMessage}${usageMessage}${creditsMessage}${cooldownMessage}\n\nTo view information about a specific command, type '${prefix}help command name'.\n\n𝙀𝙙𝙪𝙘𝙖𝙩𝙞𝙤𝙣𝙖𝙡 𝘽𝙤𝙩`;
        api.sendMessage(message, event.threadID, event.messageID);
      } else {
        api.sendMessage('Command not found.', event.threadID, event.messageID);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
