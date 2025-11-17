const path = require('path');

module.exports = {
    /* optional, custom prefix & Admin Access
	
	prefix: ['#', '.'],
	admin: true,
	
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
