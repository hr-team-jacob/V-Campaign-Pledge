var db = require('./index.js');

getProduct = productId => {
  return new Promise((res, rej) => {
    db.get(`SELECT * FROM products WHERE id = ${productId}`, (err, row) => {
      if (err) {
        console.log(`Error retrieving product ${productId} from db >> ${err}`);
        rej(err);
      } else {
        console.log(`Success! Retrieved product ${productId} from db`);
        res(row);
      }
    });
  });
};

getRewards = productId => {
  return new Promise((res, rej) => {
    db.all(
      `SELECT * FROM rewards WHERE productId = ${productId} ORDER BY minimum`,
      (err, rows) => {
        if (err) {
          console.log(
            `Error retrieving rewards for product ${productId} from db >> ${err}`
          );
          rej(err);
        } else {
          console.log(
            `Success! Retrieved rewards for product ${productId} from db`
          );
          res(rows);
        }
      }
    );
  });
};

getCountries = () => {
  return new Promise((res, rej) => {
    db.all(
      'SELECT country FROM countries ORDER BY country asc',
      (err, rows) => {
        if (err) {
          console.log(`Error retrieving countries from db >> ${err}`);
          rej(err);
        } else {
          console.log('Success! Retrieved countries from db');
          res(rows);
        }
      }
    );
  });
};

getPledgeCountForProduct = productId => {
  db.get(
    `SELECT COUNT(amount) FROM pledges WHERE id = ${productId}`,
    (err, row) => {
      if (err) {
        console.log(
          `Error retrieving pledge count for product ${productId} from db >> ${err}`
        );
      } else {
        console.log(
          `Success! Retrieved pledge count for product ${productId} from db`
        );
        return row;
      }
    }
  );
};

getPledgeSumForProduct = productId => {
  db.get(
    `SELECT SUM(amount) FROM pledges WHERE id = ${productId}`,
    (err, row) => {
      if (err) {
        console.log(
          `Error retrieving pledge sum for product ${productId} from db >> ${err}`
        );
      } else {
        console.log(
          `Success! Retrieved pledge sum for product ${productId} from db`
        );
        return row;
      }
    }
  );
};

getPledgeCountForReward = rewardId => {
  db.get(
    `SELECT COUNT(amount) FROM pledges WHERE rewardId = ${rewardId}`,
    (err, row) => {
      if (err) {
        console.log(
          `Error retrieving pledge count for reward ${rewardId} from db >> ${err}`
        );
      } else {
        console.log(
          `Success! Retrieved pledge count for reward ${rewardId} from db >> ${row}`
        );
        return row;
      }
    }
  );
};

addPledge = (productId, amount, rewardId = null) => {
  return new Promise((res, rej) => {
    db.run(
      'INSERT INTO pledges (productId, amount, rewardId) VALUES (?, ?, ?)',
      [productId, amount, rewardId],
      (err, row) => {
        if (err) {
          console.log(`Error adding pledge of $${amount} to DB >> ${err}`);
          rej(err);
        } else {
          console.log('Success! Added pledge to db');
          res(row);
        }
      }
    );
  });
};

pledgeUpdate = () => {
  return new Promise((res, rej) => {
    db.serialize(() => {
      db.run(
        `UPDATE products
          SET backers = (SELECT COUNT(amount) FROM pledges WHERE productId = products.id)`,
        err => {
          if (err) {
            console.log('Error updating backers for product -->', err.message);
            rej(err);
          }
        }
      )
        .run(
          `UPDATE products
          SET total = (SELECT SUM(amount) FROM pledges WHERE productId = products.id)`,
          err => {
            if (err) {
              console.log(
                'Error updating backers for product -->',
                err.message
              );
              rej(err);
            }
          }
        )
        .run(
          `UPDATE rewards
          SET backers = (SELECT COUNT(amount) FROM pledges WHERE rewardId = rewards.id)`,
          err => {
            if (err) {
              console.log(
                'Error updating backers for product -->',
                err.message
              );
              rej(err);
            }
          }
        );
    });
    res();
  });
};

module.exports = {
  getProduct,
  getRewards,
  getCountries,
  getPledgeCountForProduct,
  getPledgeSumForProduct,
  getPledgeCountForReward,
  addPledge,
  pledgeUpdate
};
