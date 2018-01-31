var express = require("express"),
  app = express(),
  http = require("http").Server(app),
  session = require("client-sessions"),           //Sessions handler from mozilla
  requestHandlers = require("./requestHandlers"); //Modulo customizado para actuar según URL
app.use(session({
  cookieName: "vueJSAppStructure",
  secret: "sapasdasdopaks+oaskdsfisdudfdssdpuohsdfsdf",
  duration: 24*60*60*1000,       //Milliseconds, 1 hour will kill cookie
  activeDuration: 15*60*1000,  //Milliseconds, 5 minutes of inactivity will kill cookie
}));
app.get("/", function(request, response){
  requestHandlers.init(request, response);
});
app.post("/login", function(request, response){     //Doesn"t support express.static
  var data = "";
  request.on("data", function(dataPart){
    data += dataPart;
  }).on("end", function(){
    requestHandlers.login(request, response, data);
  });
});
app.get("/logout", function(request, response){
  request.vueJSAppStructure.reset();
  response.redirect("/");
});
app.get("/init-user-data", function(request, response){
  requestHandlers.initUserData(request, response);
});
app.use("/", express.static(__dirname + "/client"));   //Vuelve estática la carpeta especificada, sin "__dirname" será ruta relativa a donde inicia el proceso Node, usándolo será absoluto a la raiz del proyecto
app.use("/css", express.static(__dirname + "/client/style"));
app.use("/file", express.static(__dirname + "/client/file"));
app.use("/image", express.static(__dirname + "/client/image"));
app.use("/assets", express.static(__dirname + "/client/assets"));
app.use("/build", express.static(__dirname + "/build"));

app.use("/js", express.static(__dirname + "/node_modules/vue/dist"));
app.use("/js", express.static(__dirname + "/node_modules/vue-router/dist"));
app.use("/js", express.static(__dirname + "/node_modules/axios/dist"));

//MongoClient.connect("mongodb://127.0.0.1:27017/alquimiaDB", function(error, database){
//  if(error)
//    console.log(error);
//  else{
//    app.locals.database = database;
    http.listen(8080, "localhost", function(){  //192.168.0.220
      console.log("listening on *:8080");
    });
//  }
//});