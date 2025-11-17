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
	
    name: 'video',
    description: 'Send videos',
    execute: async (client, msg, args) => {
        // file URL
        const videoFile = 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
        
        // file local
        // const videoFile = path.join(__dirname, '../assets/example.mp4');
        
        await msg.send({
            mediaType: 'video',
            source: videoFile,
            caption: 'This is an example video'
        });
    }
};
