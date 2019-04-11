var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var {getProduct, getRewards, getCountries, getPledgeCountForProduct, getPledgeSumForProduct, getPledgeCountForReward, addPledge} = require('../data/helpers.js');

let app = express();

app.use('/:id', express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(morgan('dev'));


app.get('/product/:id', (req, res) => {
  var id = req.params.id;
  var productInfo = {};
  getProduct(id)
    .then(results => {
      productInfo.product = results;
      getRewards(id)
        .then(results => {
          productInfo.rewards = results;
          res.send(productInfo);
        });
    })
    .catch(error => {
      console.log(`Could not retrieve product from db --> ${error}`);
    });
});

app.get('/countries/:id', (req, res) => {
  getCountries()
    .then(results => {
      res.send(results);
    })
    .catch(error => {
      console.log(`Could not retrieve countries from db --> ${error}`);
    });
});

let port = 3010;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});