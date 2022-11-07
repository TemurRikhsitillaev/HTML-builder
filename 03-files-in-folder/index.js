const fs = require("fs/promises"),
  path = require("path");

const secretFolderPath = path.join(__dirname, "secret-folder");

try {
  (async () => {
    const files = await fs.readdir(secretFolderPath, { withFileTypes: true });

    for (let i = 0; i < files.length; i++) {
      if (files[i].isFile()) {
        const nameOfFile = files[i].name.replace(/\..*/, "");

        const extensionOfFile = path.extname(files[i].name).replace(".", "");

        const sizeOfFile = (
          (
            await fs.stat(
              path.resolve(secretFolderPath, files[i].name),
              (err, stats) => {
                if (err) {
                  throw err;
                } else {
                  console.log(stats);
                }
              }
            )
          ).size / 1024
        ).toFixed(3);

        console.log(`${nameOfFile} - ${extensionOfFile} - ${sizeOfFile}kb`);
      }
    }
  })();
} catch (err) {
  console.log(err);
}
