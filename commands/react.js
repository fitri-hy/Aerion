module.exports = {
    // optional, custom prefix can be an array or string
	//
	// prefix: ['#', '.'],
    //
	
    name: 'react',
    description: 'Send react',
    execute: async (client, msg, args) => {
        await msg.send({
            react: '🚀'
        });
    }
};
