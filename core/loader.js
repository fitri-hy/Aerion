const fs = require('fs');
const path = require('path');

let commands = {};
const watchers = {};

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

  fs.readdir(commandsFolder, (err, files) => {
    if (err) return;

    files.filter(f => f.endsWith('.js')).forEach(file => {
      const fullPath = path.join(commandsFolder, file);
      if (watchers[fullPath]) return;

      watchers[fullPath] = fs.watchFile(fullPath, { interval: 200 }, () => {
        console.log(`Change detected in ${file}, reloading commands...`);
        loadCommands(false);
      });
    });
  });
}

function initLoader() {
  loadCommands(true);

  setTimeout(() => {
    watchCommands();
  }, 500);
}

function getCommands() {
  return commands;
}

module.exports = { initLoader, getCommands };
