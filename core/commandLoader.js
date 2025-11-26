const path = require('path');
const chokidar = require('chokidar');
const glob = require('glob');

let commands = new Map();
let watcher = null;

function loadCommands(logLoad = true) {
    commands.clear();

    const commandsFolder = path.join(__dirname, '../commands');
    const files = glob.sync(`${commandsFolder}/**/*.js`);

    for (const file of files) {
        try {
            const fullPath = path.resolve(file);
            delete require.cache[require.resolve(fullPath)];
            const cmd = require(fullPath);

            const key = cmd.name || path.relative(commandsFolder, file).replace(/\\/g, '/').replace('.js', '');
            commands.set(key, cmd);
        } catch (err) {
            console.error(`Failed to load command at ${file}:`, err);
        }
    }

    if (logLoad) {
        console.log(`Commands loaded: ${[...commands.keys()].join(', ')}`);
    }

    return commands;
}

function watchCommands() {
    const commandsFolder = path.join(__dirname, '../commands');
    if (watcher) return;

    watcher = chokidar.watch(`${commandsFolder}/**/*.js`, {
        ignoreInitial: true,
        persistent: true,
    });

    const updateCommand = (filePath, action) => {
        const key = path.relative(commandsFolder, filePath).replace(/\\/g, '/').replace('.js', '');
        try {
            if (action === 'unlink') {
                if (commands.has(key)) {
                    commands.delete(key);
                    console.log(`Command removed: ${key}`);
                }
            } else {
                const fullPath = path.resolve(filePath);
                delete require.cache[require.resolve(fullPath)];
                const cmd = require(fullPath);
                commands.set(cmd.name || key, cmd);
                console.log(`${action === 'add' ? 'New' : 'Updated'} command: ${cmd.name || key}`);
            }
        } catch (err) {
            console.error(`Failed to ${action} command at ${filePath}:`, err);
        }
    };

    watcher
        .on('add', filePath => updateCommand(filePath, 'add'))
        .on('change', filePath => updateCommand(filePath, 'change'))
        .on('unlink', filePath => updateCommand(filePath, 'unlink'));
}

function initLoader() {
    loadCommands(true);
    setTimeout(() => watchCommands(), 300);
}

function getCommands() {
    return commands;
}

module.exports = { initLoader, getCommands };
