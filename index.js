// const express = require('express')
// const app = express()
// var bodyParser = require('body-parser');

// app.use(express.static('public'))
// app.listen(3000, () => console.log('Server running on port 3000'))


// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.post('/logTemp',function(req,res){
//   var temp=req.body.Temperature;
//   var humidity=req.body.Humidity;
//   console.log("Temp = "+temp+", humidity is "+humidity);
//   res.end("yes");
// });

// app.get('/logTempTest',function(req,res){
//   res.sendfile("htmlBucketForNow/tempLogger.html");
// });

// // GET method route
// app.get('/testGetter', function (req, res) {
//   res.send('GET request to the homepage')
// })

// app.use(function (req, res, next) {
//   res.status(404).send("Sorry can't find that!")
// })

var express        =         require("express");
var bodyParser     =         require("body-parser");
var app            =         express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',function(req,res){
  res.sendfile("htmlBucketForNow/tester.html");
});
app.post('/login',function(req,res){
  var user_name=req.body.user;
  var password=req.body.password;
  console.log("User name = "+user_name+", password is "+password);
  res.end("yes");
});
app.listen(3000,function(){
  console.log("Started on PORT 3000");
})