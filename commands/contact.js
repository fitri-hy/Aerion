module.exports = {
    /* Optional
	
	// custom prefix
	prefix: ['#', '.'],
	
	// Admin Access true/false
	admin: true,
	
	// Bot response private|group|both
    context: 'private',
	
    */
	
    name: 'contact',
    description: 'Send text',
    execute: async (client, msg, args) => {
        const contact = {
            displayName: 'Example Support',
            vcard: `BEGIN:VCARD
VERSION:3.0
N:Doe;Jane;;;
FN:Jane Doe
ORG:Example Corp.
TITLE:Customer Support
TEL;TYPE=CELL;TYPE=VOICE;waid=12345678901:+12345678901
TEL;TYPE=WORK:+18001234567
EMAIL:jane.doe@example.com
URL:https://example.com
ADR:;;123 Main St;Springfield;IL;62704;USA
BDAY:1985-05-15
NOTE:Official support contact
END:VCARD`
        };

        await msg.send({
            contacts: { displayName: contact.displayName, contacts: [contact] }
        });
    }
};
