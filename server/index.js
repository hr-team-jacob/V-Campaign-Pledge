var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var {getProduct, getRewards, getPledgeCountForProduct, getPledgeSumForProduct, getPledgeCountForReward, addPledge} = require('../data/index.js');

let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(morgan('dev'));


app.get('/:id', (req, res) => {
  getProduct(req.params.id)
    .then(results => res.json(results))
    .catch(error => {
      console.log(`Could not retrieve product from db --> ${error}`);
    });
});

let port = 3010;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});