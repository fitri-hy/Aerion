module.exports = {
    /* optional, custom prefix & Admin Access
	
	prefix: ['#', '.'],
	admin: true,
	
    */
	
    name: 'react',
    description: 'Send react',
    execute: async (client, msg, args) => {
        await msg.send({
            react: '🚀'
        });
    }
};
