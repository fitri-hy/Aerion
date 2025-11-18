const { createClient } = require('./core/client');
const { initLoader, getCommands } = require('./core/loader');
const { handleMessage } = require('./core/handler');
const config = require('./config/app.config');
const { isAdmin } = require('./middlewares/adminMiddleware');
const { checkACL } = require('./middlewares/aclMiddleware');

(async () => {
    try {
        initLoader();
        const client = await createClient();

        client.ev.on('messages.upsert', async (m) => {
            const msg = m.messages[0];

            if (msg.key.fromMe && !config.bot.selfMode) {
                return;
            }

            if (config.bot.selfMode && !isAdmin(msg)) {
                return;
            }

            if (!checkACL(msg)) {
                return;
            }

            const commands = getCommands();
            await handleMessage(client, commands, msg);
        });
    } catch (error) {
        console.error("Failed to start bot:", error);
    }
})();
