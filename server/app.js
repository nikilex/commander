var express = require('express');
const Gpath = require('path');
var app = express();
var path = './';
var tableDir = [["Имя Файла", "Размер файла", "Дата создания"]];
const testFolder = './';
const fs = require('fs');
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// CORS middleware
const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
}

app.use(allowCrossDomain);
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/dir', urlencodedParser , (req, res) => {

  tableDir = [];
  path = req.body.body.path;

  fs.readdir(req.body.body.path, (err, files) => {
      console.log("Path: " + path);

      for (var i=0; i<files.length; i++) {

        var file = files[i];
        var fullPath = req.body.body.path + file;
        var stats = fs.statSync (fullPath); 
        var isFile = stats.isFile () ? "file" : "folder";
        
        tableDir.push( { "file": file, "size": stats.size, "birthtime": stats.birthtime, "isFile": stats.isFile() } );

      }
      console.log(tableDir);
      
      res.json({ "tableData":tableDir, "fullPath": path});
    })
      

});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});