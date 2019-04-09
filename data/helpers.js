var db = require('./index.js');

getProduct = (productId) => {
  return new Promise ((res, rej) => {
    db.get(`SELECT * FROM products WHERE id = ${productId}`, (err, row) => {
      if (err) { 
        console.log (`Error retrieving product ${productId} from db >> ${err}`);
        rej(err);
      } else {
        console.log (`Success! Retrieved product ${productId} from db >> ${JSON.stringify(row)}`);
        res(JSON.stringify(row));
      }
    });
  });
};

getRewards = (productId) => {
  return new Promise ((res, rej) => {
    db.all(`SELECT * FROM rewards WHERE productId = ${productId} ORDER BY minimum`,
      (err, rows) => {
        if (err) { 
          console.log (`Error retrieving rewards for product ${productId} from db >> ${err}`);
          rej(err);
        } else {
          console.log (`Success! Retrieved the following rewards for product ${productId} from db >> ${JSON.stringify(rows)}`);
          res(JSON.stringify(rows));
        }
      }
    );
  });
};

getPledgeCountForProduct = (productId) => {
  db.get(`SELECT COUNT(amount) FROM pledges WHERE id = ${productId}`, 
    (err, row) => {
      if (err) { 
        console.log (`Error retrieving pledge count for product ${productId} from db >> ${err}`);
      } else {
        console.log (`Success! Retrieved pledge count for product ${productId} from db >> ${row}`);
        return row;
      }
    }
  );
};

getPledgeSumForProduct = (productId) => {
  db.get(`SELECT SUM(amount) FROM pledges WHERE id = ${productId}`, 
    (err, row) => {
      if (err) { 
        console.log (`Error retrieving pledge sum for product ${productId} from db >> ${err}`);
      } else {
        console.log (`Success! Retrieved pledge sum for product ${productId} from db >> ${row}`);
        return row;
      }
    }
  );
};

getPledgeCountForReward = (rewardId) => {
  db.get(`SELECT COUNT(amount) FROM pledges WHERE rewardId = ${rewardId}`, 
    (err, row) => {
      if (err) { 
        console.log (`Error retrieving pledge count for reward ${rewardId} from db >> ${err}`);
      } else {
        console.log (`Success! Retrieved pledge count for reward ${rewardId} from db >> ${row}`);
        return row;
      }
    }
  );
};

addPledge = (productId, rewardId = null, amount) => {
  db.run(
    'INSERT INTO pledges (productId, rewardId, amount) VALUES (?, ?, ?)',
    [
      productId,
      rewardId,
      amount
    ],
    err => { 
      console.log (`Error adding pledge of $${amount} to DB >> ${err}`); 
    }
  );
};

module.exports = {getProduct, getRewards, getPledgeCountForProduct, getPledgeSumForProduct, getPledgeCountForReward, addPledge};
