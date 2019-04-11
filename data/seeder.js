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
var countrySeeds = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Angola',
  'Argentina',
  'Armenia',
  'Aruba',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bermuda',
  'Bhutan',
  'Bolivia',
  'Bosnia and Herzegovina',
  'Botswana',
  'Brazil',
  'British Virgin Islands',
  'Brunei',
  'Bulgaria',
  'Burkina Faso',
  'Burma',
  'Burundi',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Cayman Islands',
  'Central African Republic',
  'Chad',
  'Chile',
  'China',
  'Colombia',
  'Congo',
  'Costa Rica',
  'Croatia',
  'Cuba',
  'Cyprus',
  'Czech Republic',
  'Denmark',
  'Dominican Republic',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Ethiopia',
  'Fiji',
  'Finland',
  'France',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Gibraltar',
  'Greece',
  'Greenland',
  'Grenada',
  'Guam',
  'Guatemala',
  'Guernsey',
  'Guinea',
  'Guinea-Bissau',
  'Guyana',
  'Haiti',
  'Honduras',
  'Hong Kong',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland',
  'Israel',
  'Italy',
  'Jamaica',
  'Japan',
  'Jersey',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Korea',
  'Kuwait',
  'Kyrgyzstan',
  'Laos',
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Macau',
  'Macedonia',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Martinique',
  'Mauritania',
  'Mauritius',
  'Mayotte',
  'Mexico',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Morocco',
  'Mozambique',
  'Namibia',
  'Nepal',
  'Netherlands',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'Norway',
  'Oman',
  'Pakistan',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Puerto Rico',
  'Qatar',
  'Reunion',
  'Romania',
  'Russia',
  'Rwanda',
  'Samoa',
  'Saudi Arabia',
  'Senegal',
  'Serbia and Montenegro',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'Spain',
  'Sri Lanka',
  'Sudan',
  'Swaziland',
  'Sweden',
  'Switzerland',
  'Syria',
  'Taiwan',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  'Trinidad and Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Turks and Caicos Islands',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States',
  'Uruguay',
  'Uzbekistan',
  'Venezuela',
  'Vietnam',
  'Yemen',
  'Zambia',
  'Zimbabwe'
];

var productSeeder = () => {
  while (productSeeds.length < 100) {
    productSeeds.push({
      name: faker.commerce.productName(),
      deadline: faker.random.number({min: 2, max: 99}),
      goal: faker.commerce.price(10000, 1000000)
    });
  }
};

var rewardSeeder = () => {
  while (rewardSeeds.length < 750) {
    rewardSeeds.push({
      productId: faker.random.number(100),
      minimum: faker.commerce.price(3, 500, 0),
      title: faker.commerce.productName(),
      description: faker.lorem.sentences(),
      estDelivery: faker.date.month({}) + ' 2020'
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
    'INSERT INTO rewards (productId, minimum, title, description, estDelivery) VALUES (?, ?, ?, ?, ?)',
    [
      seed.productId,
      seed.minimum,
      seed.title,
      seed.description,
      seed.estDelivery
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

countrySeeds.forEach(seed => {
  db.run(
    'INSERT INTO countries (country) VALUES (?)',
    [
      seed, 
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

var pledgeUpdate = () => {
  db.serialize(()=>{
    db.run(
      `UPDATE products
        SET backers = (SELECT COUNT(amount) FROM pledges WHERE productId = products.id)`,
      (err)=>{
        if (err) {
          console.log('Error updating backers for product -->', err.message);
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
      )
      .run(
        `UPDATE rewards
        SET backers = (SELECT COUNT(amount) FROM pledges WHERE rewardId = rewards.id)`,
        (err)=>{
          if (err) {
            console.log('Error updating backers for product -->', err.message);
          }
        }
      );
  });
};