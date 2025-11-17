module.exports = {
    // optional, custom prefix can be an array or string
	//
	// prefix: ['#', '.'],
    //
	
    name: 'location',
    description: 'Send location',
    execute: async (client, msg, args) => {
        await msg.send({
            location: {
                degreesLatitude: -6.200000,
                degreesLongitude: 106.816666,
                name: 'Jakarta',
                address: 'Indonesia'
            }
        });
    }
};
