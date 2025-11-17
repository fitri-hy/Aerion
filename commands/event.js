const config = require('../config/app.config');

module.exports = {
    name: 'event',
    description: 'Test all events',
    execute: async (client, msg, args) => {

        // Placeholder message (history sync)
        if (args.includes('placeholder') || args.includes('all')) {
            if (config.features.requestPlaceholder) {
                await msg.send({ text: 'requestPlaceholder' });
                await msg.send({ text: 'Placeholder message trigger sent' });
            }
        }

        // On-demand history sync
        if (args.includes('onDemand') || args.includes('all')) {
            if (config.features.historySync) {
                await msg.send({ text: 'onDemandHistSync' });
                await msg.send({ text: 'On-demand history sync triggered' });
            }
        }

        // Poll update logging
        if (args.includes('poll') || args.includes('all')) {
            if (config.features.pollUpdates) {
                await msg.send({ text: 'Poll update test triggered' });
                console.log('Poll update simulated (check console if pollUpdates enabled)');
            }
        }

        // Event logging info
        if (args.includes('info') || args.includes('all')) {
            let eventList = [];
            const ev = config.events;
            if (ev.historyReceived) eventList.push('historyReceived');
            if (ev.newMessage) eventList.push('newMessage');
            if (ev.messageUpdate) eventList.push('messageUpdate');
            if (ev.labelsAssociation) eventList.push('labelsAssociation');
            if (ev.labelsEdit) eventList.push('labelsEdit');
            if (ev.call) eventList.push('call');
            if (ev.messageReceipt) eventList.push('messageReceipt');
            if (ev.messagesReaction) eventList.push('messagesReaction');
            if (ev.presenceUpdate) eventList.push('presenceUpdate');
            if (ev.chatsUpdate) eventList.push('chatsUpdate');
            if (ev.contactsUpdate) eventList.push('contactsUpdate');
            if (ev.chatsDelete) eventList.push('chatsDelete');

            await msg.send({
                text: `Tracking the following events: \n${eventList.join(', ')}\nCheck your console for logs when these events occur.`
            });
        }

        // Default usage instruction
        if (!args.length) {
            await msg.send({
                text: "Usage:\n" +
                      "!event placeholder → test placeholder message\n" +
                      "!event onDemand → test on-demand history sync\n" +
                      "!event poll → test poll update logging\n" +
                      "!event info → log all tracked events\n" +
                      "!event all → run all tests at once"
            });
        }
    }
};
