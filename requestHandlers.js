const path = require("path");
//const dbConection = require("./dbConection");	//Módulo personalizado de conexión a Mongodb
function init(request, response){
  response.sendFile(path.join(__dirname, "build/index.html"));
}
exports.init = init;
