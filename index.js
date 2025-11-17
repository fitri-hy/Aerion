const { createClient } = require('./core/client');
const { loadCommands, getCommands } = require('./core/loader');
const { handleMessage } = require('./core/handler');

(async () => {
    const client = await createClient();
    loadCommands();

    client.ev.on('messages.upsert', async (m) => {
        const msg = m.messages[0];
        if (!msg.key.fromMe) {
            const commands = getCommands();
            await handleMessage(client, commands, msg);
        }
    });
})();
