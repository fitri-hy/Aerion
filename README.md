<center><img src="./assets/aerion.jpg"/></center>

# Aerion

Aerion is a WhatsApp bot built using Node.js. This bot can **automatically respond to messages, execute commands**, and assist with various tasks on WhatsApp.

## 🚀 Key Features

* Multi & Custom Prefix
* QR Pairing / Code Pairing
* Session Folder Management
* Typing Effect when sending messages
* Custom Context Info (thumbnail, title, body, media type)
* Logging of messages, commands, and events
* Full Event Management (chat updates, contact updates, message reactions, etc.)
* Auto Watch Commands
* Admin Roles
* Access Control List
* Self Mode
* Context Aware Types
* Cooldown System
* Command Scaffold Generator

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
│   ├── adminMiddleware.js
│   └── cppldownMiddleware.js
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