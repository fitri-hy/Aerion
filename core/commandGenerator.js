const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

const COMMANDS_DIR = path.join(__dirname, '../commands');

if (!fs.existsSync(COMMANDS_DIR)) {
    fs.mkdirSync(COMMANDS_DIR, { recursive: true });
    console.log(`Created commands directory: ${COMMANDS_DIR}`);
}

const nameRegex = /^[a-zA-Z0-9_]+$/;

const questions = [
    {
        type: 'input',
        name: 'name',
        message: 'Command Name:',
        validate: (input) => {
            if (!input.trim()) return 'Command name cannot be empty.';
            if (!nameRegex.test(input)) return 'Only letters, numbers, and underscores (_) are allowed.';
            return true;
        }
    },
    {
        type: 'input',
        name: 'description',
        message: 'Command Description:',
        default: 'No description provided.'
    },
    {
        type: 'list',
        name: 'context',
        message: 'Context Awareness:',
        choices: [
            { name: 'Both', value: 'both' },
            { name: 'Private', value: 'private' },
            { name: 'Group', value: 'group' },
            { name: 'Follow Global Rules', value: 'global' }
        ],
        default: 'both'
    },
    {
        type: 'list',
        name: 'admin',
        message: 'Requires Admin Access:',
        choices: [
            { name: 'Yes', value: true },
            { name: 'No', value: false }
        ],
        default: false
    },
	{
		type: 'input',
		name: 'prefix',
		message: 'Custom Prefix (optional, leave blank to ignore):',
		validate: (input) => {
			if (!input) return true;
			const noSpacesRegex = /^[^\s]+$/;
			return noSpacesRegex.test(input) ? true : 'Prefix cannot contain spaces.';
		}
	}
];

async function createCommand() {
    try {
        const answers = await inquirer.prompt(questions);
        const { name, description, context, admin, prefix } = answers;

        const filePath = path.join(COMMANDS_DIR, `${name}.js`);

        if (fs.existsSync(filePath)) {
            console.error(`Error: Command "${name}" already exists at ./commands/${name}.js`);
            return;
        }

        const optionalFields = [];
        if (prefix) optionalFields.push(`prefix: ['${prefix}']`);
        if (admin) optionalFields.push(`admin: true`);
        if (context !== 'global') optionalFields.push(`context: '${context}'`);

        const template = `module.exports = {
    ${optionalFields.join(',\n    ')}${optionalFields.length ? ',' : ''}
    name: '${name}',
    description: '${description}',
    execute: async (client, msg, args) => {
        await msg.send({
            text: "This is an example response for the '${name}' command."
        });
    }
};`;

        fs.writeFileSync(filePath, template.trimStart(), 'utf-8');

        console.log(`Command "${name}" successfully created at ./commands/${name}.js`);
    } catch (err) {
        console.error(`Error creating command: ${err.message || err}`);
    }
}

createCommand();
