module.exports = {
    /* Optional
	
	// custom prefix
	prefix: ['#', '.'],
	
	// Admin Access true/false
	admin: true,
	
	// Bot response private|group|both
    context: 'private',
	
    */
	
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
