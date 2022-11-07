const fsPromise = require("fs/promises"),
  fs = require("fs"),
  path = require("path");

// File path
// const projectDistPath = path.join(__dirname, "project-dist");
// const assetsPath = path.join(__dirname, "assets");
// const assetsCopyPath = path.join(__dirname, "project-dist", "assets");
// const stylesPath = path.join(__dirname, "styles");
// const componentsDirectoryPath = path.join(__dirname, "components");
// const templateHTMLFilePath = path.join(__dirname, "template.html");

const projectDistPath = path.join(__dirname, "project-dist");
const assetsDirectoryPath = path.join(__dirname, "assets");
const assetsDirectoryCopyPath = path.join(__dirname, "project-dist", "assets");
const stylesDirectoryPath = path.join(__dirname, "styles");
const componentsDirectoryPath = path.join(__dirname, "components");
const templateHTMLFilePath = path.join(__dirname, "template.html");

const copyAssetsDirectoryToProjectDist = async (copyFrom, copyTo) => {
  await fsPromise.rm(copyTo, { recursive: true, force: true });
  await fsPromise.mkdir(copyTo, { recursive: true });

  const files = await fsPromise.readdir(copyFrom, { withFileTypes: true });

  for (let i = 0; i < files.length; i++) {
    const filePath = path.join(copyFrom, `${files[i].name}`);
    const dirPathCopy = path.join(copyTo, `${files[i].name}`);

    if (files[i].isFile()) {
      await fsPromise.copyFile(filePath, dirPathCopy);
    } else {
      await fsPromise.mkdir(dirPathCopy, { recursive: true });
      copyAssetsDirectoryToProjectDist(filePath, dirPathCopy);
    }
  }
};

const mergeStylesAndAdd = async (pathStyles) => {
  const files = await fsPromise.readdir(pathStyles, { withFileTypes: true });
  const writeStream = fs.createWriteStream(
    path.join(projectDistPath, "style.css"),
    "utf-8"
  );

  for (let i = 0; i < files.length; i++) {
    if (files[i].isFile() & (path.extname(files[i].name) === ".css")) {
      const readStream = fs.createReadStream(
        path.join(pathStyles, `${files[i].name}`)
      );
      readStream.on("data", (data) => writeStream.write(`${data}\n`));
    }
  }
};

const createIndexHTMLFile = async () => {
  const files = await fsPromise.readdir(componentsDirectoryPath, {
    withFileTypes: true,
  });
  let HTMLFile = await fsPromise.readFile(templateHTMLFilePath, "utf-8");
  const writeStream = fs.createWriteStream(
    path.join(projectDistPath, "index.html"),
    "utf-8"
  );

  for (let i = 0; i < files.length; i++) {
    if (files[i].isFile() & (path.extname(files[i].name) === ".html")) {
      const data = await fsPromise.readFile(
        path.join(componentsDirectoryPath, files[i].name),
        "utf-8"
      );
      HTMLFile = HTMLFile.replace(
        `{{${files[i].name.replace(/\..*/, "")}}}`,
        data
      );
    }
  }
  writeStream.write(HTMLFile);
};

const createWebPage = async () => {
  try {
    await fs.promises.mkdir(projectDistPath, { recursive: true });
    copyAssetsDirectoryToProjectDist(
      assetsDirectoryPath,
      assetsDirectoryCopyPath
    );
    mergeStylesAndAdd(stylesDirectoryPath);
    createIndexHTMLFile();
    console.log("Page has created");
  } catch (err) {
    console.log(err);
  }
};
createWebPage();
