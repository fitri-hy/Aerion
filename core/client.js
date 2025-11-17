const makeWASocket = require('baileys').default;
const { useMultiFileAuthState, fetchLatestBaileysVersion, makeCacheableSignalKeyStore, DisconnectReason, delay } = require('baileys');
const P = require('pino');
const qrcode = require('qrcode-terminal');
const readline = require('readline');
const chalk = require('chalk');
const fs = require('fs');
const config = require('../config/app.config');

let logger;
if (config.logger.pretty) {
    logger = P({
        level: config.logger.level,
        transport: { target: 'pino-pretty', options: { colorize: true } }
    });
} else {
    logger = P({ level: config.logger.level });
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const question = (text) => new Promise(resolve => rl.question(text, resolve));

async function createClient(msgRetryCounterCache = new Map()) {
    const { state, saveCreds } = await useMultiFileAuthState(config.sessionPath);
    const { version } = await fetchLatestBaileysVersion();

    const client = makeWASocket({
        version,
        logger,
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, logger),
        },
        msgRetryCounterCache
    });

    let isReady = false;

    client.ev.on('creds.update', saveCreds);

    client.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr && !config.usePairingCode) {
            console.log(chalk.blue('Scan QR code on terminal:'));
            qrcode.generate(qr, { small: true });
        }

        if (config.usePairingCode && !client.authState.creds.registered) {
            try {
                const phoneNumber = await question('Enter phone number (e.g. 628XXXXX): ');
                const code = await client.requestPairingCode(phoneNumber);
                console.log(chalk.green(`Pairing code generated: ${code}`));
            } catch (err) {
                console.log(chalk.red('Failed to generate pairing code:'), err);
            }
        }

        switch (connection) {
            case 'open':
                isReady = true;
                console.log(chalk.green('Bot connected to WhatsApp.'));
                break;

            case 'close':
                isReady = false;
                const reason = lastDisconnect?.error?.output?.statusCode;
                if (reason === DisconnectReason.loggedOut) {
                    console.log(chalk.red('Logged out from WhatsApp, deleting session...'));
                    if (fs.existsSync(config.sessionPath)) {
                        fs.rmSync(config.sessionPath, { recursive: true, force: true });
                        console.log(chalk.yellow('Session folder deleted.'));
                    }
                    console.log(chalk.blue('Restarting bot...'));
                    createClient();
                } else {
                    console.log(chalk.yellow('Connection lost, reconnecting...'));
                    createClient();
                }
                break;
        }
    });

    if (config.events.newMessage) {
        client.ev.on('messages.upsert', async (upsert) => {
            if (!upsert.messages) return;

            for (const msg of upsert.messages) {
                const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text;
                if (!text) continue;

				if (config.logger.logMessages !== false) {
					const fromMe = msg.key.fromMe;
					const senderName = fromMe
						? 'Bot'
						: msg.pushName || msg.key.remoteJid.split('@')[0];
					const coloredName = fromMe ? chalk.blue(senderName) : chalk.magenta(senderName);
					console.log(`${coloredName}: ${text}`);
				}
            }
        });
    }

	client.sendMessageOptionalTyping = async (jid, message, options = {}) => {
		if (!isReady) return console.log('Bot is not ready.');

		if (config.bot.withTyping) {
			await client.presenceSubscribe(jid);
			await delay(500);
			await client.sendPresenceUpdate('composing', jid);
			await delay(2000);
			await client.sendPresenceUpdate('paused', jid);
		}

		await client.sendMessage(jid, message, options);
	};

    return client;
}

module.exports = { createClient };
