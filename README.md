<center><img src="./assets/aerion.jpg"/></center>

# Aerion

Aerion is a WhatsApp bot built using Node.js. This bot can **automatically respond to messages, execute commands**, and assist with various tasks on WhatsApp.

---

## 🚀 Key Features

* Custom Prefix Commands
* QR/Pairing Code Login
* Custom Session
* Admin Roles System
* Self Mode
* Typing Simulation
* Command Access Control
* Context Info
* Log Level Control
* Pretty Logger
* Show Executed Commands
* Log Incoming Messages
* History Sync Event
* New Message Event
* Message Update Event
* Label Association Event
* Label Edit Event
* Call Event
* Message Receipt Event
* Message Reaction Event
* Presence Update Event
* Chat Update Event
* Contact Update Event
* Chat Delete Event
* Poll Aggregation
* History Sync & Placeholder Resync
* Placeholder Message Handling
* Command Cooldown (Anti-Spam Protection)
* Context-Aware Mode (Private / Group / Both)
* Command System
* Plugin System

---

## 💬 Supported Message Types

* Text
* Image
* Video
* Audio
* Document
* Location
* Contact
* Reaction
* Quote

---

## 🛠 Installation & Running the Bot

1. Install dependencies:

```bash
npm install
```

2. Run the bot:

```bash
npm start
```

---

## 📦 Create Command Template

```
npm run create
```

---

## 📘 API Reference

#### Command

Commands are stored in:

```
/commands/
```

Each Command must export an object with the structure:

```js
module.exports = {
  prefix: ["PrefixCustom"],
  admin: true/false,
  context: 'private' | 'group' | 'both',
  name: 'CommandName',
  description: 'CommandDesc',

  execute: async (client, msg, args) => {
    await msg.send({
      // key logic
    });
  }
};
```

Command Properties

| Property | Type | Required | Description |
| --------------- | ------------- | ----- | ---------------------------------------------- |
| **name** | string | ✔️ | The command name. |
| **description** | string | ✔️ | A short description of the command. |
| **execute()** | function | ✔️ | The function that is executed when the command is invoked. |
| **prefix** | array<string> | ❌ | A special prefix other than the global prefix. |
| **admin** | boolean | ❌ | Only admins may use. |
| **context** | string | ❌ | `private`, `group`, or `both`. |

Supported Key List

| Key | Writing Format | Description |
| -------------- | -------------------------------------------------------- | ------------------------------------ |
| **text** | `text: "message"` | Sends plain text. |
| **quote** | `quote: true` | Reply to a message sent by the user. |
| **react** | `react: "❤️"` | Sends an emoji reaction. |
| **mediaType** | `mediaType: "image"` | Media type (`image`, `video`, etc.). |
| **source** | `source: "url/filepath"` | Media file source (URL / local). |
| **caption** | `caption: "text"` | Caption for the media. |
| **location** | `location: { degreesLatitude: 0, degreesLongitude: 0 }` | Sends location. |
| **contacts** | `contacts: { displayName, contacts:[vcard] }` | Sends contact/vCard. |
| **document** | `mediaType: "document"` | Sends document. |
| **audio** | `mediaType: "audio"` | Sends audio. |
| **video** | `mediaType: "video"` | Sends video. |
| **ctxInfo** | `ctxInfo: true` | Sends custom context info. |

> Examples: [text.js](./commands/text.js)

#### Plugin

Plugins are stored in:

```
/plugins/
```

Each plugin must export an object with the structure:

```js
module.exports = {
  name: "PluginName",
  events: [...],

  async execute(client, event, data) {
    // plugin logic
  }
}
```

Plugin Properties

| Property | Type | Required | Description |
| -------------------------------- | ------------- | ----- | ------------------------------------------- |
| **name** | string | ✔️ | Plugin name (default = filename). |
| **events** | array<string> | ✔️ | List of events the plugin listens for. |
| **execute(client, event, data)** | function | ✔️ | Function to execute when the event occurs. |

List of Supported Events

| Event | Description |
| -------------------------- | ------------------------- |
| **init** | Called when the bot starts. |
| **messages.upsert** | New message. |
| **messages.update** | Message updated. |
| **messages.delete** | Message deleted. |
| **presence.update** | Online / typing status. |
| **connection.update** | Connection update. |
| **contacts.update** | Contact changed. |
| **chats.update** | Chat changed. |
| **chats.delete** | Chat deleted. |
| **labels.association** | Label added. |
| **labels.edit** | Label changed. |
| **call** | Incoming call. |
| **message-receipt.update** | Update message status. |
| **reaction.update** | Message reactions. |
| **history.sync** | Sync history. |
| **poll.update** | Poll updates. |
| **group.update** | Group info changes. |

> Examples: [webhook.js](./plugins/webhook.js)

---

## 📁 Project Structure

```
Aerion/
├── assets/
├── commands/
│   ├── audio.js
│   ├── contact.js
│   ├── ctx.js
│   ├── docs.js
│   ├── event.js
│   ├── image.js
│   ├── location.js
│   ├── react.js
│   ├── reply.js
│   ├── text.js
│   └── video.js
├── plugins/
│   └── webhook.js
├── config/
│   └── app.config.js
├── middlewares/
│   ├── aclMiddleware.js
│   ├── adminMiddleware.js
│   └── cooldownMiddleware.js
├── core/
│   ├── client.js
│   ├── commandGenerator.js
│   ├── handler.js
│   ├── pluginLoader.js
│   └── commandLoader.js
├── sessions/
├── utils/
│   ├── contextInfo.js
│   └── media.js
├── index.js
└── package.json
```