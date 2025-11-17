module.exports = {
    name: 'text',
    description: 'Send text',
    execute: async (client, msg, args) => {
        await msg.send({
            text: "This is an example text"
        });
    }
};
