const fs = require("fs");
const path = require("path");
const { stdin, stdout, exit } = process;



// creates folder
fs.mkdir(path.join(__dirname, "notes"), (err) => {
  if (err) throw err;
});

// creates empty note.txt file in notes folder
fs.writeFile(path.join(__dirname, "notes", "note.txt"), "", (err) => {
  if (err) throw err;
});

stdout.write("Enter text: \n");

stdin.on("data", (text) => {
  // if input is "exit" , then stop reading script
  if(text.toString().trim() == "exit") exit();
  
  // add input to .txt file in notes folder
  fs.appendFile(path.join(__dirname, "notes", "note.txt"), text, (err) => {
    if (err) throw err;
  });
});


// process of exit
process.on("exit", (code) => {
  if (code == 0 || code=="exit") {
    stdout.write("\n\nSee you next time )");
  } else {
    stdout.write(`Smth went wrong, ${code} (`);
  }
});
