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

        const plugins = getPlugins();
        for (const p of Object.values(plugins)) {
            if (typeof p.execute === "function") {
                try {
                    await p.execute(client);
                    console.log(`Plugin executed: ${p.name}`);
                } catch (err) {
                    console.error(`Error executing plugin ${p.name}:`, err);
                }
            }
        }

        client.ev.on('messages.upsert', async (m) => {
            const msg = m.messages[0];

            if (msg.key.fromMe && !config.bot.selfMode) return;
            if (config.bot.selfMode && !isAdmin(msg)) return;
            if (!checkACL(msg)) return;

            for (const p of Object.values(getPlugins())) {
                if (typeof p.onMessage === "function") {
                    try { p.onMessage(msg, client); } catch {}
                }
            }

            const commands = getCommands();
            await handleMessage(client, commands, msg);
        });
    } catch (error) {
        console.error("Failed to start bot:", error);
    }
})();
