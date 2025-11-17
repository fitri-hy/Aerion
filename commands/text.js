module.exports = {
    /* optional, custom prefix & Admin Access
	
	prefix: ['#', '.'],
	admin: true,
	
    */
	
	name: 'text',
    description: 'Send text',
    execute: async (client, msg, args) => {
        await msg.send({
            text: "This is an example text"
        });
    }
};
