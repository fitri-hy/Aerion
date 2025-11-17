const fs = require('fs');
const path = require('path');
const config = require('../config/app.config');

let commands = {};
const commandsPath = path.join(__dirname, '../commands');

function loadCommands() {
    commands = {};
    const files = fs.readdirSync(commandsPath).filter(f => f.endsWith('.js'));

    for (const file of files) {
        delete require.cache[require.resolve(`../commands/${file}`)];
        const cmd = require(`../commands/${file}`);
        commands[cmd.name] = cmd;
    }

    if (config.logger.logCommands) {
        console.log(`Loaded commands: ${Object.keys(commands).join(', ')}`);
    }

    return commands;
}

fs.watch(commandsPath, (eventType, filename) => {
    if (filename && filename.endsWith('.js')) {
        if (config.logger.logCommands) {
            console.log(`Detected command change: ${filename}. Reloading commands...`);
        }
        loadCommands();
    }
});

module.exports = { loadCommands, getCommands: () => commands };
