module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define(
    "City",
    {
      city: DataTypes.STRING,
      profit: DataTypes.BIGINT,
    },
    {}
  );
  return City;
};
