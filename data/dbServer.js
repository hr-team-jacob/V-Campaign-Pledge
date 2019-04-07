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
  while (seeds.length < 1000) {
    seeds.push({
      productId: faker.random.number(100),
    });
  }
  return seeds;
};

db.serialize(()=>{

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
      'INSERT INTO Rewards (productId, minimum, title, description, includes, estDelivery) VALUES (? ? ? ? ?)',
      [
        seed.productId,
        seed.minimum,
        seed.title,
        seed.description,
        seed.includes,
      ]
    );
  });
  
  pledgeSeeder().forEach(seed => {
    db.run(
      'INSERT INTO Pledges (productId) VALUES (?)',
      [
        seed.productId, 
      ]
    );
  });

  db.run(
    `UPDATE Rewards
      SET estDelivery = (SELECT deadline FROM Products WHERE id = Rewards.productId)`
  )
    .run(
      `UPDATE Pledges
      SET rewardId = (SELECT id FROM Rewards WHERE productId = Pledges.productId ORDER BY RANDOM() LIMIT 1)`
    )
    .run(
      `UPDATE Pledges
      SET amount = (SELECT minimum FROM Rewards WHERE id = Pledges.rewardId)`
    );
});

