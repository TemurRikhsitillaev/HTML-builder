const fsPromise = require("fs/promises"),
  path = require("path"),
  fs = require("fs");

// file path
const stylesPath = path.join(__dirname, "styles");
const projectDistPath = path.join(__dirname, "project-dist");
const writeStreame = fs.createWriteStream(
  path.join(projectDistPath, "bundle.css"),
  "utf-8"
);

try {
  (async () => {
    // creating bundle.css file in project-dist directory
    const files = await fsPromise.readdir(
      stylesPath,
      { withFileTypes: true },
      (err) => {
        if (err) throw err;
      }
    );

    // reading files one by one
    for (let i = 0; i < files.length; i++) {
      // checks is it file or not and file extension is ".css"
      if (files[i].isFile() && path.extname(files[i].name) == ".css") {
        const readStream = fs.createReadStream(
          path.join(stylesPath, `${files[i].name}`)
        );

        // writing every styles in bundle.css
        readStream.on("data", (file) => writeStreame.write(`${file}\n`));
      }
    }

    console.log("File bundle.css created!");
  })();
} catch (err) {
  console.log(err);
}
