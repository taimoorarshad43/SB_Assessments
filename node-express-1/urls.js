
const fs = require("fs");
const axios = require("axios");
const { URL } = require("url");

//If no input file argument then we error our and exit
const inputFile = process.argv[2];
if (!inputFile) {
  console.error("Usage: node urls.js <FILENAME>");
  process.exit(1);
}


// Read file contents and return if no file.
let fileContents;
try {
  fileContents = fs.readFileSync(inputFile, "utf8");
} catch (err) {
  console.error(`Error reading "${inputFile}": ${err.message}`);
  process.exit(1);
}

// Split by newline and filter out empty lines
const urls = fileContents
  .split("\n")
  .map(line => line.trim())
  .filter(line => line !== "");

urls.forEach((urlStr) => {
  // Attempt to fetch the URL
  axios
    .get(urlStr)
    .then((response) => {
      let hostname;
      try {
        hostname = new URL(urlStr).hostname;
      } catch (err) {
        console.error(`Invalid URL "${urlStr}": ${err.message}`);
        return;
      }

      // Write the HTML response body to a file named after the hostname
      fs.writeFile(hostname, response.data, "utf8", (writeErr) => {
        if (writeErr) {
          console.error(`Error writing to "${hostname}": ${writeErr.message}`);
        } else {
          console.log(`Saved ${urlStr} ---> ${hostname}`);
        }
      });
    })
    .catch((err) => {
      console.error(`Error fetching "${urlStr}": ${err.message}`);
    });
});
