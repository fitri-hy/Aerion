const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

let plugins = {};
let watcher = null;

function loadPlugins(logLoad = true) {
    plugins = {};

    const pluginsFolder = path.join(__dirname, '../plugins');
    if (!fs.existsSync(pluginsFolder)) return plugins;

    const files = fs.readdirSync(pluginsFolder).filter(f => f.endsWith('.js'));

    for (const file of files) {
        const fullPath = path.join(pluginsFolder, file);

        delete require.cache[require.resolve(fullPath)];
        const plg = require(fullPath);

        const key = plg.name || path.basename(file, '.js');
        if (!Array.isArray(plg.events)) plg.events = [];

        plugins[key] = plg;
    }

    if (logLoad) {
        console.log(`Plugins loaded: ${files.map(f => f.replace('.js', '')).join(', ')}`);
    }

    return plugins;
}

function watchPlugins() {
    const pluginsFolder = path.join(__dirname, '../plugins');
    if (!fs.existsSync(pluginsFolder)) return;

    if (watcher) return;

    watcher = chokidar.watch(`${pluginsFolder}/*.js`, {
        ignoreInitial: true,
        persistent: true,
        depth: 1
    });

    watcher
        .on('change', filePath => {
            const fileName = path.basename(filePath);
            console.log(`Change detected in ${fileName}, reloading plugins...`);
            loadPlugins(false);
        })
        .on('add', filePath => {
            const fileName = path.basename(filePath);
            console.log(`Plugin added: ${fileName}`);
            loadPlugins(false);
        })
        .on('unlink', filePath => {
            const fileName = path.basename(filePath);
            console.log(`Plugin removed: ${fileName}`);
            loadPlugins(false);
        });
}

function initPluginLoader() {
    loadPlugins(true);
    setTimeout(() => watchPlugins(), 300);
}

function getPlugins() {
    return plugins;
}

module.exports = { initPluginLoader, getPlugins };
