const { Pool, Client } = require('pg')

/*const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'album',
  password: '12345678',
  port: 5432,
}); */

const pool = new Pool({
  user: 'maaxmdhxyjgoap',
  host: 'ec2-46-137-170-51.eu-west-1.compute.amazonaws.com',
  database: 'd9n7t6rnigkv6j',
  password: 'a588110df7be8d2bec15879dfcb6dbf4571dd8774698818e64b9ae3460f000a6',
  port: 5432,
  ssl: true
})

/*module.exports ={
 readold: function (qString, callback) {
    pool.query(qString, (err, res) => {
      if (callback && typeof callback === "function") callback(err,res)
    });
  },

  write: function (qString, callback) {
    pool.query(qString, (err, res) => {
      console.log("pg write errore se presente: " + err)
      if (callback && typeof callback === "function") callback(err,res)
    });
  }
  
};
*/
const read = (qString, callback) => {
    pool.query(qString, (err, res) => {
      if (callback && typeof callback === "function") callback(err,res)
    });
};

const write =  (qString, callback) => {
  pool.query(qString, (err, res) => {
    console.log("pg write errore se presente: " + err)
    if (callback && typeof callback === "function") callback(err,res)
  });
}



module.exports  ={ read, write };

