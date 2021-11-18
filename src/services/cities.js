const db = require("../models");
const { Op } = require("sequelize");

module.exports = (result) => {
  // Find all duplicated values
  return db.City.findAll({
    where: {
      city: {
        [Op.or]: Object.keys(result),
      },
    },
    stream: true,
    raw: true,
    attributes: { exclude: ["createdAt", "updatedAt"] },
  }).then(async (stream) => {
    // Saving results with stream
    // Updating of changed elements
    let arrayToUpdate = [];
    for (let el in stream) {
      let profit = Number(result[stream[el].city]) + Number(stream[el].profit);
      arrayToUpdate.push({ id: stream[el].id, city: stream[el].city, profit });
      delete result[stream[el].city];
    }
    // Generate array for creating new records
    let array = [];
    for (let el in result) {
      array.push({ id: result[el].id, city: el, profit: result[el] });
    }

    await db.City.bulkCreate(arrayToUpdate, { updateOnDuplicate: ["profit"] });
    await db.City.bulkCreate(array);
  });
};
