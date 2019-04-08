CREATE TABLE products (
  id INTEGER NOT NULL DEFAULT NULL PRIMARY KEY, 
  name VARCHAR(255), 
  deadline TEXT
);

CREATE TABLE rewards (
  id INTEGER NOT NULL PRIMARY KEY,
  productId INTEGER,
  minimum INTEGER,
  title VARCHAR(255),
  description VARCHAR(255),
  includes VARCHAR(255),
  estDelivery TEXT,
  FOREIGN KEY (productId) REFERENCES Products (id)
);

CREATE TABLE pledges (
  id INTEGER NOT NULL PRIMARY KEY,
  productId INTEGER,
  rewardId INTEGER,
  amount INTEGER DEFAULT 0,
  FOREIGN KEY (productId) REFERENCES Products (id),
  FOREIGN KEY (rewardId) REFERENCES Rewards (id)
);