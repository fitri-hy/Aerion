module.exports = {
    /* Optional
	
	// custom prefix
	prefix: ['#', '.'],
	
	// Admin Access true/false
	admin: true,
	
	// Bot response private|group|both
    context: 'private',
	
    */
	
    name: 'reply',
    description: 'Send text',
    execute: async (client, msg, args) => {
        await msg.send({
            text: "This is an example reply",
            quote: true
        });
    }
};
