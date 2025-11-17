const config = require('../config/app.config');
const { resolveMedia } = require('../utils/media');
const { defaultContextInfo } = require('../utils/contextInfo');

async function handleMessage(client, commands, msg) {
    if (!msg.message) return;

    const text = msg.message?.conversation 
        || msg.message?.extendedTextMessage?.text;
    if (!text || !text.startsWith(config.prefix)) return;

    const args = text.slice(config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (commands[commandName]) {
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

            await commands[commandName].execute(client, msg, args);
        } catch (e) {
            console.error(e);
        }
    }
}

module.exports = { handleMessage };
