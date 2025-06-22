// 1. enter the file name
// 2. enter the content

import readline, { createInterface } from "readline";
import fs from "fs";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const fileCreation = () => {
  rl.question("Enter your filename:", (filename) => {
    rl.question("Enter the content for your file:", (content) => {
      fs.writeFile(`${filename}.txt`, content, (err) => {
        if (err) {
          console.error("Error writing file", err);
        } else {
          console.log(`File "${filename}.txt" created succcessfully`);
        }
        rl.close();
      });
    });
  });
};

fileCreation();
