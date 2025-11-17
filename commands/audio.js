const path = require('path');

module.exports = {
    /* Optional
	
	// custom prefix
	prefix: ['#', '.'],
	
	// Admin Access true/false
	admin: true,
	
	// Bot response private|group|both
    context: 'private',
	
    */
	
    name: 'audio',
    description: 'Send audio',
    execute: async (client, msg, args) => {
        // file URL
        const audioFile = 'https://diviextended.com/wp-content/uploads/2021/10/sound-of-waves-marine-drive-mumbai.mp3';
        
        // file local
        // const audioFile = path.join(__dirname, '../assets/example.mp3');
        
        await msg.send({
            mediaType: 'audio',
            source: audioFile,
            caption: 'This is an example audio'
        });
    }
};
