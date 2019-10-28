// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/timestamp/", (req, res) => {
  res.json({ unix: Date.now(), utc: Date() });
});

app.get("/api/timestamp/:date_string?", function (req, res) {
  const Today = new Date();
  //time = new Date().toString();
  //res.json({date: 'date_string = '+req.params.date_string});
  const userDate = new Date(req.params.date_string);
  if(Today.getTime() === userDate.getTime()) {
    res.json({"unix": Today.getTime(), "utc" : Today.toUTCString() });
  }
  if (Date.parse(req.params.date_string) == NaN) {
    res.json({"error" : "Invalid Date" });
    return;
  }
  if (req.params.date_string === undefined) {
    //const currentDate = new Date().toString();
    res.json({"unix": Today.getTime(), "utc" : Today.toUTCString() });
    return;
  }
  //{date: 'date = '+req.params.date_string}

  //res.json({"unix": Today.getTime(), "utc" : Today.toUTCString() });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
