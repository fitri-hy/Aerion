/*
| Property       | Format                                                 | Description                                  |
| -------------- | ------------------------------------------------------ | -------------------------------------------- |
| **number**     | `["6281234567890","628987654321"]`                     | Target number(s), required                   |
| **text**       | `text: "Hello"`                                        | Send plain text                              |
| **mediaType**  | `"image", "video", "audio", "document", "sticker"      | Send media                                   |
| **source**     | `source: "URL or file path"`                           | URL or local file path for media             |
| **caption**    | `caption: "text"`                                      | Caption for media                            |
| **location**   | `{ degreesLatitude, degreesLongitude, name, address }` | Send location                                |
| **contacts**   | `{ displayName, contacts:[vcard] }`                    | Send contact/vCard                           |
| **ctxInfo**    | `ctxInfo: true`                                        | Send custom context info                     |
| **other**      | `{...otherPayload}`                                    | Any other WA payload                         |

Examples: POST http://localhost:5050/webhook
```
{
  "number": "628XXXXXXXX",
  "text": "This is a reply"
}
```
*/

const express = require("express");
const app = express();
app.use(express.json());

module.exports = {
    name: "Webhook",
    events: ["init"],

    async execute(client) {

        const PORT = 5050;

        if (global._webhookStarted) {
            console.log("[Webhook] Already running.");
            return;
        }
        global._webhookStarted = true;

        app.post("/webhook", async (req, res) => {
            try {
                const { number, mediaType, source, caption, text, ...rest } = req.body;

                if (!number) {
                    return res.status(400).json({
                        status: false,
                        error: "Field 'number' is required"
                    });
                }

                const targets = Array.isArray(number) ? number : [number];

                for (const num of targets) {
                    const jid = num.replace(/[^0-9]/g, "") + "@s.whatsapp.net";

                    let payload = {};

                    if (text) {
                        payload.text = text;
                    }

                    if (mediaType && source) {

                        switch (mediaType) {

                            case "image":
                                payload.image = { url: source };
                                if (caption) payload.caption = caption;
                                break;

                            case "video":
                                payload.video = { url: source };
                                if (caption) payload.caption = caption;
                                break;

                            case "audio":
                                payload.audio = { url: source };
                                break;

                            case "document":
                                payload.document = { url: source };
                                payload.mimetype = "application/pdf";
                                if (caption) payload.caption = caption;
                                break;

                            case "sticker":
                                payload.sticker = { url: source };
                                break;

                            default:
                                return res.status(400).json({
                                    status: false,
                                    error: "Invalid media type"
                                });
                        }
                    }

                    Object.assign(payload, rest);
                    await client.sendMessage(jid, payload);
                }

                return res.json({
                    status: true,
                    sent_to: targets
                });

            } catch (err) {
                console.error("[Webhook Error]:", err);
                return res.status(500).json({
                    status: false,
                    error: err.message
                });
            }
        });

        app.listen(PORT, () => {
            console.log(`[Webhook] Server running on port ${PORT}`);
        });
    }
};
