const mysql = require("mysql2");

let pool = null;

function DB_Connect() {
  pool = mysql.createPool({
    connectionLimit: 200,
    host: "siriusdb.cmf8kaym3rs4.ap-northeast-2.rds.amazonaws.com",
    user: "dbuser192352",
    password: "ce123456",
    database: "siriusDB",
    port: "3306",
    charset: "UTF8MB4",
  });
  console.log("데이터베이스 pool 생성");
}
function DB_Close() {
  pool.end((error) => {
    if (error) {
      console.error("msg: ", error);
      return;
    } else {
      console.log("데이터베이스 pool 종료");
    }
  });
}
async function DB_Query(query, value) {
  return await new Promise((resolve, reject) => {
    pool.query(query, value, function (error, rows) {
      if (error) {
        reject(error);
        return;
      }
      resolve(rows);
    });
  });
}
module.exports = {
  Connect: DB_Connect,
  Close: DB_Close,
  Query: DB_Query,
};
