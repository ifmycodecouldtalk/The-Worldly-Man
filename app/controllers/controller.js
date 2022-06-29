const db = require("../models");
const Country = db.country;
const Op = db.Sequelize.Op;

// create new country
exports.newcountry = (req, res) => {
  // Save Country to Database
  Country.create({
    countryName: req.body.countryName.toLowerCase().replace(/\s+/g, '-'),
    countryCapital: req.body.countryCapital,
    countryLeader: req.body.countryLeader,
    countryLanguage: req.body.countryLanguage
  }).then(() => {
    res.send({message: "Country was registered successfully"});
  }).catch(err => {
      res.status(500).send({ message: err.message });
    });
};

// get country info
exports.returncountry = (req, res) => {
  Country.findOne({
    where: {
      countryName: req.body.countryName           // fetch post request to send the username to database
    }
  }).then(country => {
    if (!country) {
      return res.status(404).send({ message: "User Not found." });
    }
    const myCountryName = country.countryName.replace(/-/g, ' ');
    let country_array = myCountryName.split(" ");

    for (let i = 0; i < country_array.length; i++) {
      country_array[i] = country_array[i][0].toUpperCase() + country_array[i].substr(1);
    }
    country_array.join(" ");
    res.status(200).send({
      countryName: String(country_array).replace(/,/g, ' '),
      countryCapital: country.countryCapital,
      countryLeader: country.countryLeader,
      countryLanguage: country.countryLanguage
    });
  })
}