const fs = require("fs");
const parse = require("csv-parse");

const sourcePathName = "./test.csv";
const resultsFileName = "./results.csv";
const csvData = {};

// Checking if a source file exists
if (!fs.existsSync(sourcePathName)) {
  console.error("File not found!");
  return;
}

try {
  // Creating stream for reading large csv files in a stream
  fs.createReadStream(sourcePathName)
    .pipe(parse({ quote: '"', ltrim: true, rtrim: true, delimiter: "," }))
    .on("data", function (csvrow) {
      // Creating an object with results
      const city = csvrow[0];
      if (!csvData[city]) csvData[city] = 0;
      csvData[city] += Number(csvrow[2]);
    })
    .on("end", function () {
      // Saving results with stream
      const file = fs.createWriteStream(resultsFileName);
      for (let city in csvData) {
        file.write(`${city},${csvData[city]}\n`);
      }
      file.end(() => console.log("Calculated succesfully!"));
    });
} catch (err) {
  console.log("ERROR: ", err);
}
