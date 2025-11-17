module.exports = {
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
