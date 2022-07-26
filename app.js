const express = require("express");
const app = express();
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");
app.use(bodyParser.urlencoded({extended: true}));

//for adding static files to project like css and images
app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});




app.post("/",function(req,res){

  const first=req.body.firstName;
  const last=req.body.lastName;
  const email=req.body.email;

  var data={
    members:[
      {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: first,
        LNAME: last
      }
     }
    ]
  };

  var jsonData = JSON.stringify(data);
  const url = "https://us12.api.mailchimp.com/3.0/lists/e5e0d81c5a";

  const options = {
    method: "POST",
    auth: "pratik88:1117bddaac9acb8df02a02f03b86e5c1-us12"
  }
  const request = https.request(url,options, function(response){
    if(response.statusCode===200){
      res.sendFile(__dirname+"/success.html");
    }
    else{
      res.sendFile(__dirname+"/failure.html");
    }
      response.on("data",function(data){
        console.log(JSON.parse(data));
      })

  });



  request.write(jsonData);
  request.end();

});

app.post("/failure", function(req,res){
    res.redirect("/");
});


app.listen(process.env.PORT || 3000,function(){
  console.log("server is running on port 3000");
})


//Api key
//1117bddaac9acb8df02a02f03b86e5c1-us12

//audience // ID
//e5e0d81c5a
