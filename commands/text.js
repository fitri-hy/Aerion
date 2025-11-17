module.exports = {
    // optional, custom prefix can be an array or string
	//
	// prefix: ['#', '.'],
    //
	
	name: 'text',
    description: 'Send text',
    execute: async (client, msg, args) => {
        await msg.send({
            text: "This is an example text"
        });
    }
};
