
var express = require('express');
var mtehodOverride = require("method-override");
var bodyParser = require("body-parser");
var mongoose   = require("mongoose");
var app = express();

// DB setting
// mongoose.connect(process.env.MONGO_DB); // 1
mongoose.connect("mongodb://my_mean:dlskdud1@ds121321.mlab.com:21321/my_mean");
var db = mongoose.connection;
db.once("open", function(){
 console.log("DB connected");
});
db.on("error", function(err){
 console.log("DB ERROR : ", err);
});

app.set("view engine", "ejs");
// app.set("views", "/home/hosting_users/balkwang/apps/balkwang_eterinfo/views");

app.use(express.static(__dirname+"/public"));
app.use(mtehodOverride("_method"));
app.use(bodyParser.json()); // 2
app.use(bodyParser.urlencoded({extended:true})); // 3

app.use("/", require("./routes/admin"));
app.use("/admin", require("./routes/admin"));

app.listen(8003, function() { //던포
  console.log("server on:"+__dirname);
});
