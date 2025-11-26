const fs = require("fs");
const path = require("path");
const https = require("https");

const type = process.argv[2];
let url = process.argv[3];

if (!type || !url) {
  console.log("\nUsage:");
  console.log("  npm run clone plugin <url>");
  console.log("  npm run clone command <url>\n");
  process.exit(1);
}

if (!["plugin", "command"].includes(type)) {
  console.log("Invalid type. Use 'plugin' or 'command'");
  process.exit(1);
}

if (url.includes("github.com") && url.includes("/blob/")) {
  url = url
    .replace("https://github.com/", "https://raw.githubusercontent.com/")
    .replace("/blob/", "/");
}

url = url.split("?")[0];

const saveDir = path.join(__dirname, `../${type === "plugin" ? "plugins" : "commands"}`);
if (!fs.existsSync(saveDir)) fs.mkdirSync(saveDir, { recursive: true });

const fileName = url.split("/").pop().split("?")[0];
const savePath = path.join(saveDir, fileName);

if (fs.existsSync(savePath)) {
  console.error(`File already exists: ${savePath}`);
  process.exit(1);
}

console.log(`⬇ Downloading from: ${url}`);

https.get(url, (res) => {
  if (res.statusCode !== 200) {
    console.error(`Download failed (Status: ${res.statusCode})`);
    return;
  }

  const file = fs.createWriteStream(savePath);
  res.pipe(file);
  file.on("finish", () => {
    file.close();
    console.log(`Saved to: ${savePath}`);
  });
}).on("error", err => console.error(`Error: ${err.message}`));
