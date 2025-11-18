<center><img src="./assets/aerion.jpg"/></center>

# Aerion

Aerion is a WhatsApp bot built using Node.js. This bot can **automatically respond to messages, execute commands**, and assist with various tasks on WhatsApp.

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

## 🛠 Installation & Running the Bot

1. Install dependencies:

```bash
npm install
```

2. Run the bot:

```bash
npm start
```

## 📦 Create Command Template

```
npm run create
```

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
│   └── loader.js
├── sessions/
├── utils/
│   ├── contextInfo.js
│   └── media.js
├── index.js
└── package.json
```