<center><img src="./assets/aerion.jpg"/></center>

# Aerion

Aerion is a WhatsApp bot built using Node.js. This bot can automatically respond to messages, execute commands, and assist with specific tasks within WhatsApp.

## 🚀 Key Features

* Custom Command Prefix
* QR Pairing / Code Pairing
* Session Folder Management
* Typing Effect
* Custom Context Info
* Logging
* Event Management
* Auto Watch Commands

## 💬 Message Response

* Text
* Image
* Video
* Audio
* Document
* Location
* Contact
* Reply

## 🛠 Installation & Run

1. Run `npm install`
2. Start the bot using `npm start`

## 📁 Project Structure

```
Aerion/
├── commands/
│   ├── audio.js
│   ├── contact.js
│   ├── ctx.js
│   ├── docs.js
│   ├── image.js
│   ├── location.js
│   ├── reply.js
│   ├── text.js
│   └── video.js
├── config/
│   └── app.config.js
├── core/
│   ├── client.js
│   ├── handler.js
│   └── loader.js
├── sessions/
├── utils/
│   ├── contextInfo.js
│   └── media.js
├── index.js
└── package.json
```
