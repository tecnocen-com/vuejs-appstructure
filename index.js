var express = require("express");
var app = express();
var http = require("http").Server(app);
var session = require("client-sessions");           //Sessions handler from mozilla
//var io = require('socket.io')(http);
//var MongoClient = require("mongodb").MongoClient;   //Importamos base de datos
var requestHandlers = require("./requestHandlers"); //Modulo customizado para actuar según URL
app.use(session({
    cookieName: "travelAppSession",
    secret: "sapasdasdopaks+oaskdsfisdudfdssdpuohsdfsdf",
    duration: 24*60*60*1000,       //Milliseconds, 1 hour will kill cookie
    activeDuration: 15*60*1000,  //Milliseconds, 5 minutes of inactivity will kill cookie
}));
app.get("/", function(request, response){
    requestHandlers.init(request, response);
});
app.get("/home", function(request, response){
    requestHandlers.home(request, response);
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
    request.travelAppSession.reset();
    response.redirect("/");
});
app.get("/init-user-data", function(request, response){
    requestHandlers.initUserData(request, response);
});
//app.get("/config-user-data", function(request, response){
//    requestHandlers.configUserData(request, response, app.locals.database);
//});
//app.post("/data-handler", function(request, response){
//    var data = "";
//    request.on("data", function(dataPart){
//        data += dataPart;
//    }).on("end", function(){
//        data = JSON.parse(data);
//        if(typeof data.insert === "object"){
//            if(data.insert.insertTable === "style") data.insert.insertData.idUser = request.alquimiaSession.userData.idUser;
//            requestHandlers.insertData(request, response, app.locals.database, data.insert.insertData, data.insert.insertTable, data.insert.insertIdTable, data.insert.flag);
//        }
//        if(typeof data.update === "object"){
//            if(data.update.updateTable === "user") data.update.parameterData = {idUser: request.alquimiaSession.userData.idUser};
//            requestHandlers.updateData(request, response, app.locals.database, data.update.parameterData, data.update.updateData, data.update.updateTable, data.update.flag);
//        }
//        if(typeof data.remove === "object"){
//            requestHandlers.deleteData(request, response, app.locals.database, data.remove.parameterData, data.remove.removeTable, data.remove.flag);
//        }
//    });
//});


//app.post("/register-user", function(request, response){
//    var data = "";
//    request.on("data", function(dataPart){
//        data += dataPart;
//    }).on("end", function(){
//        requestHandlers.registerUser(request, response, data);
//    });
//});

//app.post("/reset-notifications", function(request, response){
//    var data = "";
//    request.on("data", function(dataPart){
//        data += dataPart;
//    }).on("end", function(){
//        data = JSON.parse(data);
//        requestHandlers.resetNotification(request, response, app.locals.database, data);
//    });
//});
//io.on('connection', function(socket){
//    socket.on('addEmpresa', function(data){
//        var notification = {
//            title: "Agregado de Empresa",
//            text: "El usuario " + data.username + " ha agregado un registro en la tabla Empresa",
//            idUser: data.idUser,
//            date: new Date()
//        };
//        requestHandlers.insertNotification(app.locals.database, notification);
//        io.emit('addEmpresa', data);
//    });
//    socket.on('editEmpresa', function(data){
//        var notification = {
//            title: "Editado de Empresa",
//            text: "El usuario " + data.username + " ha editado el registro de la tabla con id " + data.idData,
//            idUser: data.idUser,
//            date: new Date()
//        };
//        requestHandlers.insertNotification(app.locals.database, notification);
//        io.emit('editEmpresa', data);
//    });
//    socket.on('deleteEmpresa', function(data){
//        var notification = {
//            title: "Eliminado de Empresa",
//            text: "El usuario " + data.username + " ha eliminado el registro de la tabla con id " + data.idData,
//            idUser: data.idUser,
//            date: new Date()
//        };
//        requestHandlers.insertNotification(app.locals.database, notification);
//        io.emit('deleteEmpresa', data);
//    });
//});

app.use('/', express.static(__dirname + '/client'));   //Vuelve estática la carpeta especificada, sin "__dirname" será ruta relativa a donde inicia el proceso Node, usándolo será absoluto a la raiz del proyecto
app.use('/css', express.static(__dirname + '/client/style'));
app.use('/file', express.static(__dirname + '/client/file'));
app.use('/assets', express.static(__dirname + '/client/assets'));
app.use('/build', express.static(__dirname + '/build'));

app.use('/js', express.static(__dirname + '/node_modules/vue/dist'));
app.use('/js', express.static(__dirname + '/node_modules/vue-resource/dist'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

//MongoClient.connect("mongodb://127.0.0.1:27017/alquimiaDB", function(error, database){
//    if(error)
//        console.log(error);
//    else{
//        app.locals.database = database;
        http.listen(8080, "localhost", function(){  //192.168.0.220
          console.log("listening on *:8080");
        });
//    }
//});