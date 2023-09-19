// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/timestamp/:date?', function (req, res) {
  // Store our date response. This will default to the current datatime
  let date = new Date();

  // Check if the optional date parameter was provided
  if (req.params.date) {
    let unixDate = +req.params.date;

    date = isNAN(unixDate) ? new Date(req.params.date) : new Date(unixDate);

    // Check if the date passed is unix time. If it's not, use the date string provided
    if (!(date instanceof Date) || isNAN(date.getTime())) {
      return res.json({ error: 'Invalid Date' });
    }
  }

  return res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
