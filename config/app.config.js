module.exports = {
    prefix: '!',									// Command prefix for bot trigger
    usePairingCode: true, 							// If true, login using pairing code
    sessionPath: 'sessions',						// Folder name for session data
    bot: {
        withTyping: true,							// Enable/disable typing status
        ctxInfo: {
            title: '꧁✦AERION✦꧂',				// Title shown in context message
            body: 'Welcome to WhatsApp Bot!',		// Body text in context message
            thumbnailPath: './assets/aerion.jpg',	// Relative path to thumbnail image
            sourceUrl: 'https://fhylabs.com',		// URL shown when media is clicked
            mediaType: 1,               			// 1 = image, 2 = video in context info
            renderLargerThumbnail: false,			// Show larger thumbnail for media
        }
    },
    logger: {
        level: 'silent',							// Log level: silent | info | trace
        pretty: true,								// Pretty print logs
		logCommands: false,							// Show executed commands in logs
		logMessages: true       					// Display received messages in logs
    },
    events: {
        historyReceived: true,						// Log history when connecting
        newMessage: true,							// Receive new messages
        messageUpdate: true							// Log message updates (edited/deleted, etc.)
    }
};
