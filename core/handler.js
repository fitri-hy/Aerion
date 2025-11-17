const config = require('../config/app.config');
const { resolveMedia } = require('../utils/media');
const { defaultContextInfo } = require('../utils/contextInfo');
const { isAdmin } = require('../middlewares/adminMiddleware');

function getPrefix(text, command) {
    if (!text) return null;

    let prefixes = [];
    if (command?.prefix) {
        prefixes = Array.isArray(command.prefix) ? command.prefix : [command.prefix];
    }

    if (prefixes.length === 0) {
        prefixes = Array.isArray(config.prefix) ? config.prefix : [config.prefix];
    }

    for (const p of prefixes) {
        if (text.startsWith(p)) return p;
    }
    return null;
}

async function handleMessage(client, commands, msg) {
    if (!msg.message) return;

    const text = msg.message?.conversation 
        || msg.message?.extendedTextMessage?.text;
    if (!text) return;

    for (const key in commands) {
        const command = commands[key];
        const prefixUsed = getPrefix(text, command);
        if (!prefixUsed) continue;

        const args = text.slice(prefixUsed.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        if (command.name === commandName) {
			if (command.admin && !isAdmin(msg)) {
				if (config.logger.logCommands) {
					console.log('Non-admin tries to run command:', commandName);
				}
				break;
			}
			
            try {
                msg.send = async (message) => {
                    const options = {};

                    if (message.quote === true) options.quoted = msg;

                    if (message.ctxInfo === true) {
                        message.contextInfo = defaultContextInfo(config.bot.ctxInfo);
                    }

                    if (message.react) {
                        try {
                            await client.sendMessage(msg.key.remoteJid, {
                                react: {
                                    text: message.react,
                                    key: msg.key
                                }
                            });
                        } catch (e) {
                            console.error('Failed to send react:', e);
                        }
                        if (!message.text && !message.caption) return;
                    }

                    if (message.mediaType && message.source) {
                        const media = await resolveMedia(message.mediaType, message.source);
                        await client.sendMessageOptionalTyping(
                            msg.key.remoteJid,
                            { ...media, caption: message.caption || '', ...message },
                            options
                        );
                    } else {
                        await client.sendMessageOptionalTyping(
                            msg.key.remoteJid,
                            message,
                            options
                        );
                    }
                };

                await command.execute(client, msg, args);
            } catch (e) {
                console.error(e);
            }

            break;
        }
    }
}

module.exports = { handleMessage };
