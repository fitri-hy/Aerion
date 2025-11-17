const config = require('../config/app.config');
const cooldownMap = new Map();

function checkCooldown(userId, commandName) {
    if (!config.features.cooldown?.enabled) return 0;

    const userCooldowns = cooldownMap.get(userId) || {};
    const expiresAt = userCooldowns[commandName] || 0;
    const now = Date.now();

    const remaining = expiresAt - now;
    return remaining > 0 ? remaining : 0;
}

function setCooldown(userId, commandName) {
    if (!config.features.cooldown?.enabled) return;

    const userCooldowns = cooldownMap.get(userId) || {};
    const durationMs = (config.features.cooldown.duration || 5) * 1000;
    userCooldowns[commandName] = Date.now() + durationMs;
    cooldownMap.set(userId, userCooldowns);
}

async function sendCooldownMessage(client, msg, text) {
    try {
        await client.sendMessage(msg.key.remoteJid, { text });
    } catch (e) {
        console.error('Failed to send cooldown message:', e);
    }
}

module.exports = { checkCooldown, setCooldown, sendCooldownMessage };
