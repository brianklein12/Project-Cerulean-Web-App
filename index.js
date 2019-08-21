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

var express = require('express'),
    fs = require('fs');
var bodyParser       =         require("body-parser");
var app              =         express();
var urlEncodedParser =         bodyParser.urlencoded({extended: false});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',function(req,res){
  res.sendFile(__dirname + "htmlBucketForNow/tester.html");
});

app.post('/logTemp',function(req,res){
  var temperature=req.body.temp;
  var humidity=req.body.humid;
  console.log("Temperature is = "+temperature+", humidity is "+humidity);
  fs.writeFile('2pac.txt', JSON.stringify(req.body), 'ascii');
  res.end("done");
});

app.post('/sensorData', urlEncodedParser, (req, res) => {
  console.log(req.body);
  fs.appendFile('SensorData.txt', 'Temperature: ' + req.body.temp + ' F, ' 
                + 'Humidity: ' + req.body.humidity + ' %RH\n', 'utf8',
    // Callback function
    function(err){
      if(err) throw err;
    }
   );
  res.send('[Server]: Data stored!');
});

app.listen(3000,function(){
  console.log("Started on PORT 3000");
})