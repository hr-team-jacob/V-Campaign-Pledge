CREATE TABLE IF NOT EXISTS products (
  id INTEGER NOT NULL DEFAULT NULL PRIMARY KEY, 
  name VARCHAR(255), 
  deadline TEXT,
  goal INTEGER,
  backers INTEGER,
  total INTEGER
);

CREATE TABLE IF NOT EXISTS rewards (
  id INTEGER NOT NULL PRIMARY KEY,
  productId INTEGER,
  minimum INTEGER,
  title VARCHAR(255),
  description VARCHAR(255),
  estDelivery TEXT,
  backers INTEGER,
  FOREIGN KEY (productId) REFERENCES Products (id)
);

CREATE TABLE IF NOT EXISTS pledges (
  id INTEGER NOT NULL PRIMARY KEY,
  productId INTEGER,
  rewardId INTEGER,
  amount INTEGER DEFAULT 0,
  FOREIGN KEY (productId) REFERENCES Products (id),
  FOREIGN KEY (rewardId) REFERENCES Rewards (id)
);