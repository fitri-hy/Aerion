module.exports = {
    // optional, custom prefix can be an array or string
	//
	// prefix: ['#', '.'],
    //
	
    name: 'ctx',
    description: 'Send context info',
    execute: async (client, msg, args) => {
        await msg.send({
            text: 'Custom context info',
            ctxInfo: true
        });
    }
};
