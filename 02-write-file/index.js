const fs = require("fs");
const path = require("path");
const { stdin, stdout, exit } = process;

const exitInput = () => {
  stdout.write("\n\nSee you next time )");
  exit();
};

// klfjslkjflskdjfklsdjflsdjflkd

// creates empty note.txt file in notes folder
fs.writeFile(path.join(__dirname, "note.txt"), "", (err) => {
  if (err) throw err;
});

stdout.write("Enter text: \n");

stdin.on("data", (text) => {
  // if input is "exit" , then stop reading script
  if (text.toString().trim() == "exit") exitInput();

  // add input to .txt file in notes folder
  fs.appendFile(path.join(__dirname, "note.txt"), text, (err) => {
    if (err) throw err;
  });
});

// process of exit
process.on("SIGINT", exitInput);
