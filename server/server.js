var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(morgan('dev'));


let port = 3010;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});