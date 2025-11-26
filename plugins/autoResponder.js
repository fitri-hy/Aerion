module.exports = {
  name: "AutoResponder",
  events: ["messages.upsert"],

  async execute(client, ...args) {
    const m = args[0];
    if (!m || !m.messages || !m.messages[0]) return;
    const msg = m.messages[0];
    if (!msg.message) return;

    if (msg.key.fromMe) return;

    const text = msg.message.conversation?.toLowerCase() 
              || msg.message?.extendedTextMessage?.text?.toLowerCase();
    if (!text) return;

    const responses = {
      "hello": "Hello too! 👋"
    };

    for (const key in responses) {
      if (text.includes(key)) {
        await client.sendMessageOptionalTyping(msg.key.remoteJid, {
          text: responses[key],
        }, { quoted: msg });
        break;
      }
    }
  }
};
