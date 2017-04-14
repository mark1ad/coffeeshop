var express = require('express');
var app = express();

//*********************************
// Get home page
app.get('/', function(req, res) {
  res.render('index.ejs');
})

//***********************************
app.listen(3000, function() {
  console.log("coffee listening");
})
