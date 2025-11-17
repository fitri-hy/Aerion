module.exports = {
    /* optional, custom prefix & Admin Access
	
	prefix: ['#', '.'],
	admin: true,
	
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
