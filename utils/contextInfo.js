const path = require('path');
const fs = require('fs');
const config = require('../config/app.config');

const defaultContextInfo = () => {
    let thumbnail = null;
    const thumbnailPath = config.bot.ctxInfo.thumbnailPath;

    if (thumbnailPath && fs.existsSync(path.join(__dirname, '..', thumbnailPath))) {
        thumbnail = fs.readFileSync(path.join(__dirname, '..', thumbnailPath));
    }

    return {
        externalAdReply: {
            title: config.bot.ctxInfo.title || '',
            body: config.bot.ctxInfo.body || '',
            mediaType: config.bot.ctxInfo.mediaType ?? 1,
            renderLargerThumbnail: config.bot.ctxInfo.renderLargerThumbnail ?? false,
            thumbnail: thumbnail,
            sourceUrl: config.bot.ctxInfo.sourceUrl || '',
        }
    };
};

module.exports = {
    defaultContextInfo
};
