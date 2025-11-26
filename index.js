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

        for (const plugin of plugins.values()) {
            if (plugin.events.includes("init") && typeof plugin.execute === "function") {
                try {
                    await plugin.execute(client);
                    console.log(`Plugin executed: ${plugin.name}`);
                } catch (err) {
                    console.error(`Error executing plugin ${plugin.name}:`, err);
                }
            }
        }

        const supportedEvents = [
            "messages.upsert", "messages.update", "messages.delete",
            "presence.update", "connection.update", "contacts.update",
            "chats.update", "chats.delete", "labels.association",
            "labels.edit", "call", "message-receipt.update",
            "reaction.update", "history.sync", "poll.update", "group.update"
        ];

        for (const eventName of supportedEvents) {
            client.ev.on(eventName, async (...args) => {
                for (const plugin of plugins.values()) {
                    if (plugin.events.includes(eventName) && typeof plugin.execute === "function") {
                        try {
                            await plugin.execute(client, ...args);
                        } catch (err) {
                            console.error(`Error in plugin ${plugin.name} for event ${eventName}:`, err);
                        }
                    }
                }

                if (eventName === "messages.upsert") {
                    const m = args[0];
                    if (!m || !m.messages || !m.messages[0]) return;
                    const msg = m.messages[0];
                    if (!msg.message) return;
                    if (msg.key.fromMe && !config.bot.selfMode) return;
                    if (config.bot.selfMode && !isAdmin(msg)) return;
                    if (!checkACL(msg)) return;

                    const commands = getCommands();
                    await handleMessage(client, commands, msg);
                }
            });
        }

        console.log('Bot is running and listening to all supported events...');
    } catch (error) {
        console.error("Failed to start bot:", error);
    }
})();
