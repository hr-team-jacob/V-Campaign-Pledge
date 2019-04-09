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

var productSeeds = [];
var rewardSeeds = [];
var pledgeSeeds = [];

var productSeeder = () => {
  while (productSeeds.length < 100) {
    productSeeds.push({
      name: faker.commerce.productName(),
      deadline: faker.date.future(1).toISOString(),
      goal: faker.commerce.price(10000, 1000000)
    });
  }
};

var rewardSeeder = () => {
  while (rewardSeeds.length < 500) {
    rewardSeeds.push({
      productId: faker.random.number(100),
      minimum: faker.commerce.price(3, 500, 0),
      title: faker.commerce.productName(),
      description: faker.lorem.sentences(),
    });
  }
};

var pledgeSeeder = () => {
  while (pledgeSeeds.length < 1000) {
    pledgeSeeds.push({
      productId: faker.random.number(100),
    });
  }
};

productSeeder();
rewardSeeder();
pledgeSeeder();

productSeeds.forEach(seed => {
  db.run(
    'INSERT INTO products (name, deadline, goal) VALUES (?, ?, ?)', 
    [
      seed.name,
      seed.deadline,
      seed.goal
    ],
    (err)=>{
      if (err) {
        console.log('Error seeding products table -->', err.message);
      }
    }
  );
});

rewardSeeds.forEach(seed => {
  db.run(
    'INSERT INTO rewards (productId, minimum, title, description) VALUES (?, ?, ?, ?)',
    [
      seed.productId,
      seed.minimum,
      seed.title,
      seed.description,
    ],
    (err)=>{
      if (err) {
        console.log('Error seeding rewards table -->', err.message);
      }
    }
  );
});

pledgeSeeds.forEach(seed => {
  db.run(
    'INSERT INTO pledges (productId) VALUES (?)',
    [
      seed.productId, 
    ],
    (err)=>{
      if (err) {
        console.log('Error seeding pledges table -->', err.message);
      }
    }
  );
});


db.serialize(()=>{

  db.run(
    `UPDATE rewards
      SET estDelivery = (SELECT deadline FROM products WHERE id = rewards.productId)`,
    (err)=>{
      if (err) {
        console.log('Error updating rewards estDelivery -->', err.message);
      }
    }
  )
    .run(
      `UPDATE pledges
        SET rewardId = (SELECT id FROM rewards WHERE productId = pledges.productId ORDER BY RANDOM() LIMIT 1)`,
      (err)=>{
        if (err) {
          console.log('Error updating pledges rewardId -->', err.message);
        }
      }
    )
    .run(
      `UPDATE products
        SET backers = (SELECT COUNT(amount) FROM pledges WHERE productId = products.id)`,
      (err)=>{
        if (err) {
          console.log('Error updating backers for product -->', err.message);
        }
      }
    )
    .run(
      `UPDATE rewards
        SET backers = (SELECT COUNT(amount) FROM pledges WHERE rewardId = rewards.id)`,
      (err)=>{
        if (err) {
          console.log('Error updating backers for product -->', err.message);
        }
      }
    )
    .run(
      `UPDATE pledges
      SET amount = (SELECT minimum FROM rewards WHERE id = pledges.rewardId)`,
      (err)=>{
        if (err) {
          console.log('Error updating pledges amount -->', err.message);
        }
      }
    )
    .run(
      `UPDATE products
        SET total = (SELECT SUM(amount) FROM pledges WHERE productId = products.id)`,
      (err)=>{
        if (err) {
          console.log('Error updating backers for product -->', err.message);
        }
      }
    );
});


module.exports = db;
