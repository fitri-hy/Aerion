module.exports = {
    name: 'react',
    description: 'Send react',
    execute: async (client, msg, args) => {
        await msg.send({
            react: '🚀'
        });
    }
};
