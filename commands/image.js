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
	
    name: 'image',
    description: 'Send images',
    execute: async (client, msg, args) => {
        // file url
        const imageFile = 'https://placehold.co/600x400/png';
        
		// file local
        //const imageFile = path.join(__dirname, '../assets/example.png');
		
        await msg.send({ 
			mediaType: 'image', 
			source: imageFile, 
			caption: 'This is an example image' 
		});
    }
};
