const express = require('express');

const router = express.Router();
console.log("API");
const delay = require('express-delay');
const MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://root:root@localhost:27017/';
router.use(delay(1000));
console.log("connect");

var globalDbCon;
var globalClient;
MongoClient.connect(url,
    {
        useUnifiedTopology: true,
        server: {
          poolSize: 10
        }
      },
      (err,client)=>{
          if(err){console.log(err)}
          else{
            globalDbCon = client.db("sprint");
            globalClient=client
          }
      }
    )

router.post('/',(req,response)=>{
  console.log(req.body);
  globalDbCon.collection("sprint_tracker").insertOne(req.body, function(err, res) {
    if (err) throw err;
    else
    {
    console.log("1 document inserted");
    console.log(res);
   // closeSession();
    response.send(JSON.stringify(res))
    }
    
  });
 
})

// function closeSession(){
//     globalClient.close()
 // }

module.exports = router;