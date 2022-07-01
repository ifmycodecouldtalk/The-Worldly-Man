const controller = require("../controllers/controller.js");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // creating a new country
  app.post(
    "/new-country",
    controller.newcountry
  );
  app.post(
    "/get-country",
    controller.returncountry
  );
  // getting country information and rendering page
  app.get("/country/:country", (req, res) => {
    let data = {"countryName" : req.params.country.toLowerCase()};
    console.log(data);
    async function getCountry(){ 
      const response = await fetch("http://localhost:8080/get-country", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
      });
      return response.json();
    }
    getCountry().then(country => {
        res.render('countries/'+req.params.country.toLowerCase(), {
            countryName: country.countryName,
            countryCapital: country.countryCapital,
            countryLeader: country.countryLeader,
            countryLanguage: country.countryLanguage
        });
    })
  });
};