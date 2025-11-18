const config = require('../config/app.config');
const { isAdmin } = require('./adminMiddleware');

function isGroupMessage(msg) {
    return msg.key.remoteJid.endsWith('@g.us');
}

function isPrivateMessage(msg) {
    return !isGroupMessage(msg);
}

function checkACL(msg) {
    const { admin, private: allowPrivate, group: allowGroup } = config.bot.commandAccessControl;

    if (admin && !isAdmin(msg)) {
        return false;
    }

    if (!allowPrivate && isPrivateMessage(msg)) {
        return false;
    }

    if (!allowGroup && isGroupMessage(msg)) {
        return false;
    }

    return true;
}

module.exports = { checkACL };
