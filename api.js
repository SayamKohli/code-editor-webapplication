const express = require("express");
const app = express();
const bodyP = require("body-parser");
const compiler = require("compilex");
const options = { stats: true };
compiler.init(options);
app.use(bodyP.json());
app.use(
  "/codemirror",
  express.static("D:/code editor webapplication/codemirror")
);
app.get("/", function (req, res) {
  res.sendFile("D:/code editor webapplication/index.html");
});

app.post("/compile", function (req, res) {
  var code = req.body.code;
  var input = req.body.input;
  var lang = req.body.lang;
  try {
    
     if (lang == "Python") {
        if (!input) {
          //if windows
          var envData = { OS: "windows" };
          //else
          
          compiler.compilePython(envData, code, function (data) {
            if(data.output){
          res.send(data);
      }
      else{
          res.send({output:"error"})
      }
          });
        } else {
          //if windows
          var envData = { OS: "windows" };
          
          compiler.compilePythonWithInput(envData, code, input, function (data) {
            if(data.output){
          res.send(data);
      }
      else{
          res.send({output:"error"})
      }
          });
        }
      }
      else if (lang == "Java") {
      if (!input) {
        //if windows
        var envData = { OS: "windows" };
        
        compiler.compileJava(envData, code, function (data) {
          if(data.output){
        res.send(data);
    }
    else{
        res.send({output:"error"})
    }
        });
      } else {
        //if windows
        var envData = { OS: "windows" };
        
        compiler.compileJavaWithInput(envData, code, input, function (data) {
          if(data.output){
        res.send(data);
    }
    else{
        res.send({output:"error"})
    }
        });
      }
    } 
    else if ((lang = "Cpp")) {
        if (!input) {
          //if windows
          var envData = { OS: "windows", cmd: "g++" ,options:{timeout:10000} }; // (uses g++ command to compile )
          
          compiler.compileCPP(envData, code, function (data) {
            if(data.output){
          res.send(data);
      }
      else{
          res.send({output:"error"})
      }
            //data.error = error message
            //data.output = output value
          });
  
          //res is the response object
        } else {
          //if windows
          var envData = { OS: "windows", cmd: "g++" ,options:{timeout:10000}}; // (uses g++ command to compile )
          
          compiler.compileCPPWithInput(envData, code, input, function (data) {
            if(data.output){
          res.send(data);
      }
      else{
          res.send({output:"error"})
      }
          });
        }
      }
  } catch (e) {
    console.log("error");
  }
});

app.listen(8000);
