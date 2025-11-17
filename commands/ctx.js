module.exports = {
    /* Optional
	
	// custom prefix
	prefix: ['#', '.'],
	
	// Admin Access true/false
	admin: true,
	
	// Bot response private|group|both
    context: 'private',
	
    */
	
    name: 'ctx',
    description: 'Send context info',
    execute: async (client, msg, args) => {
        await msg.send({
            text: 'Custom context info',
            ctxInfo: true
        });
    }
};
