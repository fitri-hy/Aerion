const config = require('../config/app.config');

function isAdmin(msg) {
    let sender = msg.key.participantPn || msg.key.remoteJid;
    if (!sender) return false;
    sender = sender.split('@')[0];
    return config.admins.includes(sender);
}


async function adminOnly(client, msg, commandName) {
    if (!isAdmin(msg)) {
        return false;
    }
    return true;
}

module.exports = { isAdmin, adminOnly };
