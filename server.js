var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// require("./routes/htmlRoutes")(app);

app.listen(PORT, function () {
    console.log("App listing on PORT: " + PORT);
});

var reservations = [];
// var waitingList = [];

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/table.html"));
});

app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/reserve.html"));
});

// Displays all characters
app.get("/api/clients", function (req, res) {
    return res.json(clients);
});

// Displays a single character, or returns false
app.get("/api/clients/:character", function (req, res) {
    var chosen = req.params.clients;

    console.log(chosen);

    for (var i = 0; i < clients.length; i++) {
        if (chosen === clients[i].routeName) {
            return res.json(clients[i]);
        }
    }

    return res.json(false);
});

app.post("/api/clients", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body-parser middleware
    var newclient = req.body;
  
    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newclient.routeName = newclient.name.replace(/\s+/g, "").toLowerCase();
  
    console.log(newclient);
  
    clients.push(newclient);
  
    res.json(newclient);
  });

var reservations = [];
// var waitingList = [];

function Reservations(name, phone, email, uniqueId) {
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.uniqueId = uniqueId;
}