module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("Cities", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      profit: {
        type: Sequelize.BIGINT,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      deletedAt: {
        type: Sequelize.DATE,
        defaultValue: null,
      },
    }),

  down: (queryInterface) => Promise.all([queryInterface.dropTable("Cities")]),
};
