module.exports = (sequelize, Sequelize) => {
    const Country = sequelize.define("countries", {
      countryName: {
        type: Sequelize.STRING
      },
      countryCapital: {
        type: Sequelize.STRING
      },
      countryLeader: {
        type: Sequelize.STRING
      },
      countryLanguage: {
        type: Sequelize.STRING
      }
    });
    return Country;
  };