const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

let commands = {};
let watcher = null;

function loadCommands(logLoad = true) {
    commands = {};

    const commandsFolder = path.join(__dirname, '../commands');
    if (!fs.existsSync(commandsFolder)) return commands;

    const files = fs.readdirSync(commandsFolder).filter(f => f.endsWith('.js'));

    for (const file of files) {
        const fullPath = path.join(commandsFolder, file);

        delete require.cache[require.resolve(fullPath)];
        const cmd = require(fullPath);

        const key = cmd.name || path.basename(file, '.js');
        commands[key] = cmd;
    }

    if (logLoad) {
        console.log(`Commands loaded: ${files.map(f => f.replace('.js', '')).join(', ')}`);
    }

    return commands;
}

function watchCommands() {
    const commandsFolder = path.join(__dirname, '../commands');
    if (!fs.existsSync(commandsFolder)) return;

    if (watcher) return;

    watcher = chokidar.watch(`${commandsFolder}/*.js`, {
        ignoreInitial: true,
        persistent: true,
        depth: 1
    });

    watcher
        .on('change', filePath => {
            const fileName = path.basename(filePath);
            console.log(`Change detected in ${fileName}, reloading commands...`);
            loadCommands(false);
        })
        .on('add', filePath => {
            const fileName = path.basename(filePath);
            console.log(`New command added: ${fileName}`);
            loadCommands(false);
        })
        .on('unlink', filePath => {
            const fileName = path.basename(filePath);
            console.log(`Command removed: ${fileName}`);
            loadCommands(false);
        });
}

function initLoader() {
    loadCommands(true);
    setTimeout(() => watchCommands(), 300);
}

function getCommands() {
    return commands;
}

module.exports = { initLoader, getCommands };
