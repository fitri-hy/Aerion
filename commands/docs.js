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
	
    name: 'docs',
    description: 'Send documentation',
    execute: async (client, msg, args) => {
        // file URL
        const docFile = 'https://pdfobject.com/pdf/sample.pdf';
        
        // file local
        // const docFile = path.join(__dirname, '../assets/example.pdf');
        
        await msg.send({
            mediaType: 'document',
            source: docFile,
            caption: 'This is an example document'
        });
    }
};
