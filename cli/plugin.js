const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

const PLUGINS_DIR = path.join(__dirname, '../plugins');

if (!fs.existsSync(PLUGINS_DIR)) {
    fs.mkdirSync(PLUGINS_DIR, { recursive: true });
    console.log(`Created plugins directory: ${PLUGINS_DIR}`);
}

const nameRegex = /^[a-zA-Z0-9_]+$/;

const eventChoices = [
    'init',
    'messages.upsert',
    'messages.update',
    'messages.delete',
    'presence.update',
    'connection.update',
    'contacts.update',
    'chats.update',
    'chats.delete',
    'labels.association',
    'labels.edit',
    'call',
    'message-receipt.update',
    'reaction.update',
    'history.sync',
    'poll.update',
    'group.update'
];

const questions = [
    {
        type: 'input',
        name: 'name',
        message: 'Plugin Name:',
        validate: (input) => {
            if (!input.trim()) return 'Plugin name cannot be empty.';
            if (!nameRegex.test(input)) return 'Only letters, numbers, and underscores (_) are allowed.';
            return true;
        }
    },
    {
        type: 'checkbox',
        name: 'events',
        message: 'Select Events the Plugin Listens To:',
        choices: [
            new inquirer.Separator('=== Special Option ==='),
            { name: 'All Events', value: 'ALL' },
            ...eventChoices
        ],
        validate: (input) => {
            return input.length ? true : 'Select at least one event.';
        }
    }
];

async function createPlugin() {
    try {
        const answers = await inquirer.prompt(questions);
        let { name, events } = answers;

        if (events.includes('ALL')) {
            events = eventChoices;
        }

        const filePath = path.join(PLUGINS_DIR, `${name}.js`);

        if (fs.existsSync(filePath)) {
            console.error(`Error: Plugin "${name}" already exists at ./plugins/${name}.js`);
            return;
        }

        const template = `/**
 * Plugin: ${name}
 * Events: ${events.join(', ')}
 * 
 * Supported Events:
 * init, messages.upsert, messages.update, messages.delete,
 * presence.update, connection.update, contacts.update, chats.update,
 * chats.delete, labels.association, labels.edit, call,
 * message-receipt.update, reaction.update, history.sync,
 * poll.update, group.update
 */

module.exports = {
    name: '${name}',
    events: [${events.map(e => `'${e}'`).join(', ')}],

    async execute(client, ...args) {
        console.log('Plugin "${name}" triggered by event:', event);
        // Add your plugin logic here
    }
};`;

        fs.writeFileSync(filePath, template.trimStart(), 'utf-8');

        console.log(`Plugin "${name}" successfully created at ./plugins/${name}.js`);
    } catch (err) {
        console.error(`Error creating plugin: ${err.message || err}`);
    }
}

createPlugin();
