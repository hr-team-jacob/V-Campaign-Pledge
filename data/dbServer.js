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
      name: faker.commerce.productName(),
      deadline: faker.date.future(1)

    });
  }
  return seeds;
};

var rewardSeeder = () => {
  var seeds = [];
  while (seeds.length < 500) {
    seeds.push({
      productId: faker.random.number(100),
      minimum: faker.commerce.price(3, 500, 0),
      title: faker.commerce.productName(),
      description: faker.lorem.sentences(),
      includes: faker.product(3)
    });
  }
  return seeds;
};

var pledgeSeeder = () => {
  var seeds = [];
  while (seeds.length < 999) {
    seeds.push({
      productId: faker.random.number(100),
      shipDest: faker.address.country()
    });
  }
  return seeds;
};

productSeeder().forEach(seed => {
  db.run(
    'INSERT INTO Products (name, deadline) VALUES (? ?)', 
    [
      seed.name,
      seed.deadline
    ]
  );
});

rewardSeeder().forEach(seed => {
  db.run(
    'INSERT INTO Rewards (productId, minimum, title, description, includes) VALUES (? ? ? ? ?)',
    [
      seed.productId,
      seed.minimum,
      seed.title,
      seed.description,
      seed.includes
    ]
  );
});

pledgeSeeder().forEach(seed => {
  db.run(
    'INSERT INTO Pledges (productId, shipDest) VALUES (? ?)',
    [
      seed.productId, 
      seed.shipDest
    ]
  );
});
