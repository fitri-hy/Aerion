const { createClient } = require('./core/client');
const { initLoader, getCommands } = require('./core/commandLoader');
const { initPluginLoader, getPlugins } = require('./core/pluginLoader');
const { handleMessage } = require('./core/handler');
const config = require('./config/app.config');
const { isAdmin } = require('./middlewares/adminMiddleware');
const { checkACL } = require('./middlewares/aclMiddleware');

(async () => {
    try {
        initLoader();
        initPluginLoader();

        const client = await createClient();

        for (const plugin of getPlugins().values()) {
            if (typeof plugin.execute === "function") {
                try {
                    await plugin.execute(client);
                    console.log(`Plugin executed: ${plugin.name}`);
                } catch (err) {
                    console.error(`Error executing plugin ${plugin.name}:`, err);
                }
            }
        }

        client.ev.on('messages.upsert', async (m) => {
            const msg = m.messages[0];

            if (msg.key.fromMe && !config.bot.selfMode) return;
            if (config.bot.selfMode && !isAdmin(msg)) return;
            if (!checkACL(msg)) return;

            for (const plugin of getPlugins().values()) {
                if (typeof plugin.onMessage === "function") {
                    try { 
                        await plugin.onMessage(msg, client); 
                    } catch (err) {
                        console.error(`Error in plugin onMessage ${plugin.name}:`, err);
                    }
                }
            }

            const commands = getCommands();
            await handleMessage(client, commands, msg);
        });

        console.log('Bot is running...');
    } catch (error) {
        console.error("Failed to start bot:", error);
    }
})();
