const fs = require('fs');
const path = require('path');
const config = require('../config/app.config');

const watchFolders = ['commands', 'config'];
let commands = {};
const watchers = {};

function loadCommands(logLoad = true) {
    commands = {};

    for (const folder of watchFolders) {
        const folderPath = path.join(__dirname, `../${folder}`);
        if (!fs.existsSync(folderPath)) continue;

        const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.js'));

        for (const file of files) {
            const fullPath = path.join(folderPath, file);
            delete require.cache[require.resolve(fullPath)];
            const cmd = require(fullPath);

            const key = folder === 'commands' ? cmd.name : path.basename(file, '.js');
            commands[key] = cmd;
        }

        if (logLoad && config.logger.logCommands) {
            console.log(`Loaded ${folder}: ${files.map(f => f.replace('.js','')).join(', ')}`);
        }
    }

    return commands;
}

loadCommands(true);

setTimeout(() => {
    for (const folder of watchFolders) {
        const folderPath = path.join(__dirname, `../${folder}`);
        if (!fs.existsSync(folderPath)) continue;

        fs.watch(folderPath, (eventType, filename) => {
            if (!filename || !filename.endsWith('.js')) return;

            const key = `${folder}/${filename}`;
            if (watchers[key]) clearTimeout(watchers[key]);

            watchers[key] = setTimeout(() => {
                if (config.logger.logCommands) {
                    console.log(`Detected change in ${folder}: ${filename}. Reloading...`);
                }
                loadCommands(false);
                delete watchers[key];
            }, 100);
        });
    }
}, 500);

function getCommands() {
    return commands;
}

module.exports = { loadCommands, getCommands };
