module.exports = {
    name: 'ctx',
    description: 'Send context info',
    execute: async (client, msg, args) => {
        await msg.send({
            text: 'Custom context info',
            ctxInfo: true
        });
    }
};
