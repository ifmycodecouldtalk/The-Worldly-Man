var express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
var app = express();
app.set('port', process.env.PORT || 8080);

// database
const db = require("./app/models");
db.sequelize.sync();

// set up handlebars view engine
var handlebars = require('express3-handlebars')
 .create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// middleware
// static files
app.use(express.static(__dirname + '/public'));
// bootstrap
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
// cors
var corsOptions = {
    origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
// parse application/json requests
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.get("/", function (req, res) {
    res.render('home');
})
app.get("/new-country", function(req, res){
    res.render('form');
})
require('./app/routes/country.route.js')(app);

// custom 404 page
app.use(function(req, res){
 res.type('text/plain');
 res.status(404);
 res.send('404 - Not Found');
});
// custom 500 page
app.use(function(err, req, res, next){
 console.error(err.stack);
 res.type('text/plain');
 res.status(500);
 res.send('500 - Server Error');
});


app.listen(app.get('port'), function(){
 console.log( 'Express started on http://localhost:' +
 app.get('port') + '; press Ctrl-C to terminate.' );
});
