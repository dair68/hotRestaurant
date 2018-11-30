var express = require("express");
var path = require("path");

var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var available = [
    {
        routeName: "test",
        name: "Test",
        phone: 1234567890,
        email: "test@tests.com",
        uniqueID: "F65rt"
    }
];

var waitlist = [];

console.log(available[0].routeName)

app.get("/", function (request, response) {
    response.sendFile(path.join(__dirname, "../front/home.html"))
});

app.get("/reservation", function (request, response) {
    response.sendFile(path.join(__dirname, "../front/reservation.html"))
});

app.get("/tables", function (request, response) {
    response.sendFile(path.join(__dirname, "../front/tables.html"))
});

app.get("/api/data", function (request, response) {
    return response.json(available), response.json(waitlist);
});

app.get("/api/data/:reservation", function (request, response) {
    var customer = request.params.reservation;

    for (var i = 0; i < available.length; i++) {
        if (customer === available[i].routeName) {
            return response.json(available[i]);
        } else if (customer === waitlist[i].routeName) {
            return response.json(waitlist[i]);
        };
    };

    return response.json(false);
});

app.post("api/data", function (request, response) {
    var newCustomer = request.body;
    var position = "";

    newCustomer.routeName = newCustomer.name.replace(/\s+/g, "").toLowerCase();
    console.log(newCustomer);

    if (available.length === 5) {
        waitlist.push(newCustomer);
        position = "Waitlist";
    } else {
        available.push(newCustomer);
        position = "Reserved";
    }
    
    response.json(newCustomerm, "\n", "Position: " + position);
});

app.listed(PORT, function () {
    console.log("App listening on PORT " + PORT);
});