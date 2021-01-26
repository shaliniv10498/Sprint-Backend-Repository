const express = require('express');

const router = express.Router();
console.log("API");
const delay = require('express-delay');
const MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://root:root@localhost:27017/';
router.use(delay(3000));
console.log("connect");


var dbConnection;
var globalClient;
MongoClient.connect(url,
    {
      useUnifiedTopology: true,
      server: {
        poolSize: 10
      }
    },
    (err,client)=>{
      if(err){ console.log(err);}
      else{
      dbConnection = client.db("sprint");
      console.log("Database connected!!");
      globalClient=client
      }
    }
    
)
console.log("hello!%%");
router.post('/',  (req,res)=>{
  //console.log("Sort ho jao be");
  console.log(req.body.data);
  var  pageNum = req.body.currentPage? parseInt(req.body.currentPage):1;
  var pageSize = req.body.pageSize ? parseInt(req.body.pageSize):10 ;
  var response ={
    status : undefined,
    result : null,
    count : null,
  }
 if(( req.body.formQuery === undefined || req.body.formQuery === ''|| req.body.formQuery === null)&& (req.body.sorting===null||req.body.sorting===undefined)){
  var sprintCollection = dbConnection.collection("sprint_tracker").find({},{projection:{_id : 0, pkId : 1, sprint_id : 1, sprint_name : 1, total_items : 1, no_completed_items : 1,no_inprogress_items:1,no_descoped_items:1}})
   dbConnection.collection("sprint_tracker").find().count({},(er,res)=>{
      if(er){
        console.log(er)
      }
      else{
        console.log(res);
        response.count = res
      }
  })
  sprintCollection.sort({pkId : -1}).skip(pageSize*(pageNum-1)).limit(pageSize).toArray(function(err, result) {
    if (err){ console.log(err);}
   else{ 
     response.status = 200;
     response.result = result;
     
     
     console.log(response.count);
    // closeSession();
     res.send(JSON.stringify(response));  
   }   
   
 })
 
  }
  else if(req.body.sorting!=null || req.body.sorting != undefined) {
    console.log("Yes Sorting is on its way")
   
  
 dbConnection.collection("sprint_tracker").find({},{projection:{_id : 0, pkId : 1, sprint_id : 1, sprint_name : 1, total_items : 1, no_completed_items : 1,no_inprogress_items:1,no_descoped_items:1}}).sort(req.body.sorting).skip(pageSize*(pageNum-1)).limit(pageSize).toArray((err, result)=>{
      if (err){ console.log(err);}
      response.result =  result;
      response.status = 200
      console.log(response.result);
     // closeSession();
      res.send(JSON.stringify(response));  
    }) 
  }
else
  {
    dbConnection.collection("sprint_tracker").find({"sprint_id" :new RegExp(req.body.formQuery,"i")}).count({},(er,res)=>{
      if(er){
        console.log(er)
      }
      else{
        console.log(res);
        response.count = res
      }
  })
  dbConnection.collection("sprint_tracker").find({"sprint_id" :new RegExp(req.body.formQuery,"i")},{projection:{_id : 0, pkId : 1, sprint_id : 1, sprint_name : 1, total_items : 1, no_completed_items : 1,no_inprogress_items:1,no_descoped_items:1}}).skip(pageSize*(pageNum-1)).limit(pageSize).toArray(function(err, result) {
      if (err){ console.log(err);}
     else{ 
       response.status = 200;
       response.result = result;
       
       res.send(JSON.stringify(response));  
       //closeSession()
     }   
     
   })
  }
  
})

// function closeSession(){
//   globalClient.close()
// }

    

module.exports = router;