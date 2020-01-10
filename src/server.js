const express = require('express');
const app = express();
const server = require('http').createServer(app);
let bodyParser = require('body-parser');
let mongoClient = require('mongodb').MongoClient;

//mongodb connectivity
// var mongoUrl = "mongodb://localhost:27017/";
var mongoUrl ="mongodb+srv://shivam:shivam027@cluster0-jg0ns.mongodb.net/test?retryWrites=true&w=majority";



app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}))
app.use(bodyParser.json({limit: '50mb',extended: true}))

mongoClient.connect(mongoUrl,(err,db)=>{
  if(err) throw err;
  var dbo = db.db('todolist');
  
  dbo.collection('content').insertOne({'name':"list"},(err,res)=>{
    if(err) throw err;
  
  })
  
  
})

app.post('/sendData',(req,res)=>{
  
  mongoClient.connect(mongoUrl,{ useUnifiedTopology: true },(err,db)=>{
    if(err) throw err;
    var dbo = db.db('todolist');
    
    dbo.collection('content').findOne({},(err,result)=>{

      res.send(result.Tasks);
    
    })   
    
  })

})

app.post('/deleteData',(req,res)=>{
  mongoClient.connect(mongoUrl,{ useUnifiedTopology: true },(err,db)=>{
    if(err) throw err;
    var dbo = db.db('todolist');
    console.log(req.body.delTask);
    dbo.collection('content').updateOne({"name": "list"},{$pull : {"Tasks": {id: req.body.delTask}}},(err,result)=>{
      res.send({'status':'deleted'});
    })
  })
})

app.post('/insertData',(req,res)=>{
  
  mongoClient.connect(mongoUrl,{ useUnifiedTopology: true },(err,db)=>{
    if(err) throw err;
    var dbo = db.db('todolist');

      dbo.collection('content').updateOne(
        {"name": "list"},
        {$push : {"Tasks": {id: req.body.id, task: req.body.task, startDate:req.body.startDate, time: req.body.time}}}
      )
    })

})

app.post('/updateData',(req,res)=>{
  
  mongoClient.connect(mongoUrl,{ useUnifiedTopology: true },(err,db)=>{
    if(err) throw err;
    var dbo = db.db('todolist');

      dbo.collection('content').updateOne(
        {"name": "list", "Tasks.id": req.body.id},
        {$set : {"Tasks.$": {id: req.body.id, task: req.body.task,startDate:req.body.startDate, time: req.body.time}}}
      )
    })

})


server.listen(5000,(req,res)=>{
  console.log("server is listening to port number 5000")
})