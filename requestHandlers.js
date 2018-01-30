var path = require("path"),
  httprequest = require("request"),
  serviceUrl = {
    baseURL: "http://34.239.10.155/index.php/api",
    dataURL: "/v1/",
    tokenURL: "/oauth2/token"
};
//var dbConection = require("./dbConection");	//Módulo personalizado de conexión a Mongodb
function init(request, response){
	if(request.vueJSAppStructure && request.vueJSAppStructure.userData)
    response.sendFile(path.join(__dirname, "client/home.html"));
	else
		response.sendFile(path.join(__dirname, "client/index.html"));
}
function login(request, response, data){
	var parsedData = JSON.parse(data);
	httprequest.post({
    url: serviceUrl.baseURL + serviceUrl.tokenURL,
    headers: {
      Authorization: "Basic dGVzdGNsaWVudDp0ZXN0cGFzcw==",   //username: testclient || password: testpass
    },
    form: {
      grant_type: "password", 
      username: parsedData.user, 
      password: parsedData.pass
    }
  },
  function(errorRequest, responseRequest, bodyRequest){
    if(errorRequest)
      console.log("Error: "+ errorRequest);
    else{
      var body = JSON.parse(bodyRequest);
      if(body.status !== 401){
        request.vueJSAppStructure.userData = {
          access_token: body.access_token
        };
      }
      response.writeHead(200, "application/json");
      response.end(bodyRequest);
    }
  });
}
function initUserData(request, response){
	if(request.vueJSAppStructure && request.vueJSAppStructure.userData){
		response.writeHead(200, {"Content-Type": "json/application"}); //Escribimos cabecera (Typo de contenido, texto tipo html)
		response.end(JSON.stringify({
      success: true,
      baseURL: serviceUrl.baseURL,
      dataURL: serviceUrl.dataURL,
      access_token: request.vueJSAppStructure.userData.access_token,
      apiKey: serviceUrl.apiKey
    }));  //Terminamos respuesta
	}
	else{
		response.writeHead(200, {"Content-Type": "json/application"}); //Escribimos cabecera (Typo de contenido, texto tipo html)
		response.end(JSON.stringify({success: false}));  //Terminamos respuesta
	}
}
exports.init = init;
exports.login = login;
exports.initUserData = initUserData;