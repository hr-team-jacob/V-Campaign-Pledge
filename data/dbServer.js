var sqlite3 = require('sqlite3').verbose();
var faker = require('faker');
var path = require('path');

var dbPath = path.join(__dirname, 'hackstarter.db');

var db = new sqlite3.Database(dbPath, err => {
  if (err) {
    console.error('ERROR >> could not connect to DB');
  } else {
    console.log('<< Connected to HackStarter database >>');
  }
});

var productSeeder = () => {
  var seeds = [];
  while (seeds.length < 100) {
    seeds.push({
      currency: faker.finance.currencyCode(),
      deadline: faker.whatever()
    });
  }
  return seeds;
};

var rewardSeeder = () => {
  var seeds = [];
  while (seeds.length < 100) {
    seeds.push({
      productId: faker.whatever(),
      minimum: faker.whatever(),
      title: faker.whatever(),
      includes: faker.whatever(),
      estDelivery: faker.whatever(),
      shipsTo: faker.whatever(),
      deadline: faker.whatever()
    });
  }
  return seeds;
};

var pledgeSeeder = () => {
  var seeds = [];
  while (seeds.length < 100) {
    seeds.push({
      productId: faker.whatever(),
      rewardId: faker.whatever(),
      shipDest: faker.whatever(),
      amount: faker.whatever()
    });
  }
  return seeds;
};

productSeeder().forEach(seed => {
  db.run(
    'INSERT INTO Products (currency, deadline) VALUES (? ?)', 
    [
      seed.currency,
      seed.deadline
    ]
  );
});

rewardSeeder().forEach(seed => {
  db.run(
    'INSERT INTO Rewards (productId, minimum, title, includes, estDelivery, shipsTo, deadline) VALUES (? ? ? ? ? ? ?)',
    [
      seed.productId,
      seed.minimum,
      seed.title,
      seed.includes,
      seed.estDelivery,
      seed.shipsTo,
      seed.deadline
    ]
  );
});

pledgeSeeder().forEach(seed => {
  db.run(
    'INSERT INTO Pledges (productId, rewardId, shipDest, amount) VALUES (? ? ? ?)',
    [
      seed.productId, 
      seed.rewardId, 
      seed.shipDest, 
      seed.amount
    ]
  );
});
