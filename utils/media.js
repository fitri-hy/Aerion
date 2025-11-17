const fs = require('fs');
const axios = require('axios');

async function resolveMedia(mediaType, source) {
    if (!source) throw new Error('Source media tidak tersedia');

    if (/^https?:\/\//.test(source)) {
        return { [mediaType]: { url: source } };
    }

    if (fs.existsSync(source)) {
        return { [mediaType]: fs.readFileSync(source) };
    }

    throw new Error('Media is invalid or not found');
}

module.exports = { resolveMedia };
