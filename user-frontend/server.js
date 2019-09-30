const express = require("express");
const bodyParser = require('body-parser')

global.config = require("./config");
const router = require("./routes");
const moment = require("moment");
const app = express();

// Serve public dir
app.use(express.static("public"));
// Set view engine ejs so that wont need to type .ejs extension
app.set("view engine", "ejs");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())
router(app);

app.locals.apiUrl = config.apiUrl;
app.locals.moment = moment;


app.get("/test",function(req, res){
  res.render("backup");
});

// Start listening to server
app.listen(8080, function() {
    console.log("The server has started on port 8080");
});
