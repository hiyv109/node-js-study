/* index.js */
//Moduel Require (1)
const express = require("express"),
      app = express(),
      pool = require("./config/database"),
      bodyParser = require('body-parser')
    
//Middleware Set (2)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))

/* POST : New User (3) */ 
app.post("/", (req,res) => {
    //Request Param 추출
    const param = [ req.body.age, req.body.name]
    //pool 실행
    pool((sql) => {
        //sql를 매개 변수 설정 시, sql.query로 sql Query 작성
        //데이터를 넣을 곳에 ?를 넣어 뒤의 매개 변수 param가 ?에 들어감
        sql.query("insert into tbl_user(age,name) value(?,?)", param, (err, doc) => {
            //err가 있으면 err를 출력하고, 없으면 true를 보내줌
            err ? console.log(err) : res.send({result : true})
        })
        //DB 연결 해제
        sql.release()
    })
})

/* Get : Get Users (4) */ 
/*app.get("/", (req,res) => {
    pool((sql) => {
        //가져온 DB 정보가 row에 배열 형식으로 담김
        sql.query("select * from tbl_user", (err, row) => {
            //err가 없으면 결과를 보내줌
            err ? console.log(err) : res.send({result : row})
        })
        //DB 연결 해제
        sql.release()
    })
})
*/
/* SERVER ON (5)*/
const port = 8080
app.listen(port, () => console.log(`SERVER ON PORT : ${port}`))