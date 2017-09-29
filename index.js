var express = require("express");
var app = express();
var http = require("http").Server(app);
var session = require("client-sessions");           //Sessions handler from mozilla
var formidable = require("formidable");             //Modulo para parsear y subir archivos de forms
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
app.get("/download-import", function(request, response){
    var e = [];
    switch(request.query.type){
        case "client":
            e[0] = "clientes/importador-clientes.xlsx";
            e[1] = "clientes";
            break;
        case "store":
            e[0] = "tiendas/importador-tiendas.xlsx";
            e[1] = "tiendas";
            break;
        case "resource":
            e[0] = "recursos_humanos/importador-recursos-humanos.xlsx";
            e[1] = "recursos humanos";
            break;
    }
    if(e.length > 0)
        response.download(__dirname + "/client/file/" + e[0], "Tech For Data - Importación de datos (" + e[1] + ").xlsx", function(error){
            if(error)
                console.log(error);
        });
});
//app.post("/upload-import", function(request, response){
//    var form = new formidable.IncomingForm();
//    form.parse(request, function(error, fields, files){
//        if(error)
//            console.log(error);
//        else{
//            console.log(fields, files);
//            //request.travelAppSession.userData.importFile = files.pdfLoad.path;
//            response.writeHead(200, "application/json");
//            response.end(JSON.stringify({success: true}));
//        }
//    });
//});
app.use('/', express.static(__dirname + '/client'));   //Vuelve estática la carpeta especificada, sin "__dirname" será ruta relativa a donde inicia el proceso Node, usándolo será absoluto a la raiz del proyecto
app.use('/css', express.static(__dirname + '/client/style'));
app.use('/file', express.static(__dirname + '/client/file'));
app.use('/image', express.static(__dirname + '/client/image'));
app.use('/assets', express.static(__dirname + '/client/assets'));
app.use('/build', express.static(__dirname + '/build'));

app.use('/js', express.static(__dirname + '/node_modules/vue/dist'));
app.use('/js', express.static(__dirname + '/node_modules/vue-resource/dist'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/js', express.static(__dirname + '/node_modules/jquery-ui-dist'));
app.use('/js', express.static(__dirname + '/node_modules/jquery-ui-multidatespicker'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

http.listen(8080, "localhost", function(){  //192.168.0.220
  console.log("listening on *:8080");
});