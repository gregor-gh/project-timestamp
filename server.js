// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (_req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp",(_req,res) => {
  const utc = new Date();
  const unix = Date.parse(new Date());

  res.json({unix: unix, utc: utc});
})

app.get("/api/timestamp/:datetime",(req,res) => {

  const value = req.params.datetime
  let utc;
  let unix;

  if (!isNaN(value)) {
    unix = value;
    utc = new Date(parseInt(value));
  }
  else {
    utc=new Date(value)
    unix=Date.parse(value)
  }
  if (utc=="Invalid Date")
    res.json({error: "Invalid Date"});
  else
    res.json({unix: Number(unix), utc: utc.toUTCString()});
});
// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
