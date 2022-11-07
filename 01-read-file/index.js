const fs = require("fs"),
  path = require("path"),
  { stdout } = require("process");

const readStream = fs.createReadStream(
  path.join(__dirname, "text.txt"),
  "utf-8"
);
readStream.on("data", (text) => stdout.write(text));
