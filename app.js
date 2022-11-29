const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/'));

app.get('',function(req,res){
    res.sendFile(path.join(__dirname+'/dist/index.html'));
  });

app.set("port", process.env.PORT || 3000);


app.listen(app.get("port"), () => {
    console.log("Server started on port " + app.get("port"));
});