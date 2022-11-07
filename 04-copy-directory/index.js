const fs = require("fs/promises"),
  path = require("path");

// pathes to directories
const filesCopyPath = path.join(__dirname, "files-copy"),
  filesPath = path.join(__dirname, "files");

try {
  (async () => {
    // remove files-copy folder in order to update files inside
    await fs.rm(filesCopyPath, { recursive: true, force: true }, (err) => {
      if (err) throw err;
    });

    // add files-copy folder with updated files
    await fs.mkdir(path.join(__dirname, "files-copy"), (err) => {
      if (err) throw err;
    });

    // reading files
    const files = await fs.readdir(filesPath);

    // reading files one by one
    for (let i = 0; i < files.length; i++) {
      // coping to files-copy folder
      await fs.copyFile(
        path.join(filesPath, `${files[i]}`),
        path.join(filesCopyPath, `${files[i]}`)
      );
    }
    console.log("\n\nFiles copied!");
  })();
} catch (err) {
  console.log(err);
}
