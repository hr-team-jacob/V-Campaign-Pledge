var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');

var {
  getProduct,
  getRewards,
  getCountries,
  getPledgeCountForProduct,
  getPledgeSumForProduct,
  getPledgeCountForReward,
  addPledge,
  pledgeUpdate
} = require('../data/helpers.js');

let app = express();

app.use(cors({origin: '*'}));
app.use('/:id', express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/product/:id', (req, res) => {
  var id = req.params.id;
  var productInfo = {};
  getProduct(id)
    .then(results => {
      productInfo.product = results;
      getRewards(id).then(results => {
        productInfo.rewards = results;
        res.send(productInfo);
      });
    })
    .catch(error => {
      console.log(`Could not retrieve product from db --> ${error}`);
    });
});

app.post('/product/:id', (req, res) => {
  var id = req.params.id;
  addPledge(id, req.body.amount)
    .then(results => {
      pledgeUpdate();
      res.send(results);
    })
    .catch(error => {
      console.log(`Could not add product to db --> ${error}`);
    });
});

app.post('/reward/:id/', (req, res) => {
  var id = req.params.id;
  var amount = req.body.amount;
  var reward = req.body.reward;
  console.log('reqbody looks like ----> ', req.body);
  addPledge(id, amount, reward)
    .then(results => {
      pledgeUpdate();
      res.send(results);
    })
    .catch(error => {
      console.log(`Could not add product to db --> ${error}`);
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
