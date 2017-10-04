var path = require("path");
var httprequest = require("request");
var serviceUrl = {
        baseURL: "https://ayp.serviciostecnocen.com/index.php/api/",       //https://ayp.serviciostecnocen.com/api
        dataURL: "v1/",
        tokenURL: "oauth2/token",
        apiKey: "AIzaSyBRRmzVxMe4JRzwDmxcGrQRxm_WPlHiPRs"
};
//var dbConection = require("./dbConection");	//Módulo personalizado de conexión a Mongodb
function init(request, response){
	if(request.travelAppSession && request.travelAppSession.userData)
                response.sendFile(path.join(__dirname, "client/home.html"));
	else
		response.sendFile(path.join(__dirname, "client/index.html"));
}
function home(request, response){
	if(request.travelAppSession && request.travelAppSession.userData)
		response.sendFile(path.join(__dirname, "client/home.html"));
	else
		response.redirect("/");
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
					request.travelAppSession.userData = {
						access_token: body.access_token
					};
				}
				response.writeHead(200, "application/json");
				response.end(bodyRequest);
			}
		}
	);
}
function initUserData(request, response){
	if(request.travelAppSession && request.travelAppSession.userData){
		response.writeHead(200, {"Content-Type": "json/application"}); //Escribimos cabecera (Typo de contenido, texto tipo html)
		response.end(JSON.stringify({
                        success: true,
                        baseURL: serviceUrl.baseURL,
                        dataURL: serviceUrl.dataURL,
                        access_token: request.travelAppSession.userData.access_token,
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
exports.home = home;
exports.initUserData = initUserData;