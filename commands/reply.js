module.exports = {
    /* optional, custom prefix & Admin Access
	
	prefix: ['#', '.'],
	admin: true,
	
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
