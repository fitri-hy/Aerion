const path = require('path');
const chokidar = require('chokidar');
const glob = require('glob');

let plugins = new Map();
let watcher = null;

function loadPlugins(logLoad = true) {
    plugins.clear();

    const pluginsFolder = path.join(__dirname, '../plugins');
    const files = glob.sync(`${pluginsFolder}/**/*.js`);

    for (const file of files) {
        try {
            const fullPath = path.resolve(file);
            delete require.cache[require.resolve(fullPath)];
            const plg = require(fullPath);

            if (!Array.isArray(plg.events)) plg.events = [];
            const key = plg.name || path.relative(pluginsFolder, file).replace(/\\/g, '/').replace('.js', '');
            plugins.set(key, plg);
        } catch (err) {
            console.error(`Failed to load plugin at ${file}:`, err);
        }
    }

    if (logLoad) {
        console.log(`Plugins loaded: ${[...plugins.keys()].join(', ')}`);
    }

    return plugins;
}

function watchPlugins() {
    const pluginsFolder = path.join(__dirname, '../plugins');
    if (watcher) return;

    watcher = chokidar.watch(`${pluginsFolder}/**/*.js`, {
        ignoreInitial: true,
        persistent: true,
    });

    const updatePlugin = (filePath, action) => {
        const relativeKey = path.relative(pluginsFolder, filePath).replace(/\\/g, '/').replace('.js', '');
        try {
            if (action === 'unlink') {
                if (plugins.has(relativeKey)) {
                    plugins.delete(relativeKey);
                    console.log(`Plugin removed: ${relativeKey}`);
                }
            } else {
                const fullPath = path.resolve(filePath);
                delete require.cache[require.resolve(fullPath)];
                const plg = require(fullPath);
                if (!Array.isArray(plg.events)) plg.events = [];

                const key = plg.name || relativeKey;
                plugins.set(key, plg);

                console.log(`${action === 'add' ? 'New' : 'Updated'} plugin: ${key}`);
            }
        } catch (err) {
            console.error(`Failed to ${action} plugin at ${filePath}:`, err);
        }
    };

    watcher
        .on('add', filePath => updatePlugin(filePath, 'add'))
        .on('change', filePath => updatePlugin(filePath, 'change'))
        .on('unlink', filePath => updatePlugin(filePath, 'unlink'));
}

function initPluginLoader() {
    loadPlugins(true);
    setTimeout(() => watchPlugins(), 300);
}

function getPlugins() {
    return plugins;
}

module.exports = { initPluginLoader, getPlugins };
