module.exports = {
    /* Optional
	
	// custom prefix
	prefix: ['#', '.'],
	
	// Admin Access true/false
	admin: true,
	
	// Bot response private|group|both
    context: 'private',
	
    */
	
    name: 'react',
    description: 'Send react',
    execute: async (client, msg, args) => {
        await msg.send({
            react: '🚀'
        });
    }
};
