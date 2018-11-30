var express = require("express");
var path = require("path");

var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var data = [
    {
        routeName: "test",
        name: "Test",
        phone: 1234567890,
        email: "test@tests.com",
        uniqueID: "F65rt"
      }
];

console.log(data[0].routeName)

app.get("/", function(request, response) {
    response.sendFile(path.join(__dirname, "../front/index.html"))
});

app.get("/form", function(request, response) {
    response.sendFile(path.join(__dirname, "../front/form.html"))
});

app.get("/reservation", function(request, response) {
    response.sendFile(path.join(__dirname, "../front/reservation.html"))
});

app.get("/api/data", function(request, response) {
    return response.json(data);
});

app.get("/api/data/:reservation", function(request, response) {
    var customer = requests.params.reservation;

    for (var d = 0; d < data.length; d++) {
        if (customer === data[i].routeName) {
            return response.json(data[i]);
        };
    };

    return response.json(false);
});

app.post("api/data", function(request, response) {
    var newCustomer = request.body;

    newCustomer.routeName = newCustomer.name.replace(/\s+/g, "").toLowerCase();

    console.log(newCustomer);
    data.push(newCustomer);
    response.json(newCustomer);
});

app.listed(PORT, function() {
    console.log("App listening on PORT " + PORT);
});