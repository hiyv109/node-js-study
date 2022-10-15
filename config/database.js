/* database.js */
//Module Require
const mysql = require("mysql"),
  //DB 정보 선언
  dbInfo = {
    host: "127.0.0.1", //DB 주소
    port: "3306", //DB Port
    user: "root", //DB 계정 ID
    password: "1234", //DB 계정 PW
    database: "test", //DB 내 사용 database
  },
  //pool에 DB 정보를 담아 연결한 Pool 저장
  pool = mysql.createPool(dbInfo)

//모듈화
module.exports = (callback) => {
  pool.getConnection((err, conn) => {
    console.log(err)
    if (!err) {
      callback(conn)
    }
  })
}