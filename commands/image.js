const path = require('path');

module.exports = {
    /* optional, custom prefix & Admin Access
	
	prefix: ['#', '.'],
	admin: true,
	
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
