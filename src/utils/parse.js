const fs = require("fs");
const parse = require("csv-parse");

const saveResults = require("../services/cities.js");
const db = require("../models");

const resultsFileName = "./results.csv";
const CHUNK_SIZE = 1000;

module.exports = function (sourcePathName) {
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
      .on("data", async (csvrow) => {
        // Creating an object with results
        while (Object.keys(csvData).length > CHUNK_SIZE) {
          element = 0;
          await saveResults(csvData);
          csvData = {};
        }
        const city = csvrow[0];
        if (!csvData[city]) csvData[city] = 0;
        csvData[city] += Number(csvrow[2]);
      })
      .on("end", async () => {
        // Save the rest of data to db
        const restDate = await saveResults(csvData);
        // Clean object manually
        if (restDate) csvData = {};

        // Read data from db as stream
        db.City.findAll({
          stream: true,
          raw: true,
          attributes: { exclude: ["id", "createdAt", "updatedAt"] },
        }).then((stream) => {
          // Saving results with stream
          const file = fs.createWriteStream(resultsFileName);
          for (let el in stream) {
            file.write(`${stream[el].city},${stream[el].profit}\n`);
          }
          file.end(() => console.log("Calculated succesfully!"));
        });
      });
  } catch (err) {
    console.log("ERROR: ", err);
  }
};
