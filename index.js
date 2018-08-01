const express = require("express");

const requestHandlers = require("./requestHandlers"); //Modulo customizado para actuar según URL
const app = express();

app.get("/", (request, response) => requestHandlers.init(request, response));

app.use("/js", express.static(__dirname + "/build/js"));
app.use("/", express.static(__dirname + "/build"));

app.all('*', (request, response) => response.redirect("/"));
//MongoClient.connect("mongodb://127.0.0.1:27017/alquimiaDB", function(error, database){
//  if(error)
//    console.log(error);
//  else{
//    app.locals.database = database;
      app.listen(4200, "localhost", () => console.log("listening on *:4200"));
//  }
//});
