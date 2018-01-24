var path = require('path');
function checkSession(request, response, database){
	var user = database.collection("user");
	user.findOne({
    idUser: request.alquimiaSession.userData.idUser
  },
  { password: 0 },
  { strict: true },
  function(error, result){
    if(error)
      console.log(error);
    else if(result){
      response.locals.user = result;
      response.sendFile(path.join(__dirname, "client/home.html"));
    }
    else{
      request.alquimiaSession.reset();
      response.redirect("/");
    }
	});
}
function checkNoSession(request, response, database){
	var user = database.collection("user");
	user.findOne({
    idUser: request.alquimiaSession.userData.idUser
  },
  { password: 0 },
  { strict: true },
  function(error, result){
    if(error)
      console.log(error);
    else if(result)
      response.redirect("/home");
    else{
      request.alquimiaSession.reset();
      response.redirect("/");
    }
	});
}
//function configUserData(request, response, database){
//	var user = database.collection("user");
//	request.alquimiaSession.userData.idUser = JSON.parse(request.query.idUser);
//	user.findOne({
//  idUser: request.alquimiaSession.userData.idUser },
//  { password: 0 },
//  { strict: true },
//  function(error, result){
//    var notification = database.collection("notification");
//    if(error){
//      console.log(error);
//      response.writeHead(200, "application/json");
//      response.end(JSON.stringify({success: false}));
//    }
//    else
//      notification.find({idUser: {$ne: request.alquimiaSession.userData.idUser} }).toArray(function(error2, result2){
//        var style = database.collection("style"),
//          unviewedNotifications = [],
//          i = 0,
//          newUser;
//        if(error2){
//          console.log(error2);
//          response.writeHead(200, "application/json");
//          response.end(JSON.stringify({success: false}));
//        }
//        else{
//          if(result){
//            style.find({idUser: request.alquimiaSession.userData.idUser }).toArray(function(error3, result3){
//              if(error3){
//                console.log(error3);
//                response.writeHead(200, "application/json");
//                response.end(JSON.stringify({success: false}));
//              }
//              else{
//                response.writeHead(200, {"Content-Type": "json/application"}); //Escribimos cabecera (Typo de contenido, texto tipo html)
//                response.end(JSON.stringify({
//                  idUser: request.alquimiaSession.userData.idUser,
//                  activeStyle: result.activeStyle,
//                  appMenuPosition: result.appMenuPosition,
//                  appMenuOrder: result.appMenuOrder,
//                  sidebarState: result.sidebarState,
//                  sidebarBtnVisibility: result.sidebarBtnVisibility,
//                  unviewedNotifications: result.unviewedNotifications,
//                  gridConfig: result.gridConfig,
//                  notifications: result2 ? result2 : [],
//                  styles: result3,
//                  success: true
//                }));  //Terminamos respuesta
//              }
//            });
//          }
//          else{
//            if(result2)
//              for(; i < result2.length; i++)
//                unviewedNotifications.push(result2[i]._id);
//            newUser = {
//              idUser: request.alquimiaSession.userData.idUser,
//              activeStyle : 0,
//              appMenuPosition: "1",
//              appMenuOrder : [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 ],
//              sidebarState: true,
//              sidebarBtnVisibility: true,
//              unviewedNotifications: unviewedNotifications,
//              gridConfig: {
//                empresa: {
//                  order: {
//                    id: 0,
//                    nombre: 1,
//                    activo: 2,
//                    direccion: 3,
//                    direccion_fiscal: 4,
//                    giro: 5,
//                    pagadora: 6,
//                    unidad_negocio: 7,
//                    estado_id: 8,
//                    tipo_id: 9
//                  },
//                  visibility: {
//                    id: true,
//                    nombre: false,
//                    activo: false,
//                    direccion: false,
//                    direccion_fiscal: true,
//                    giro: false,
//                    pagadora: false,
//                    unidad_negocio: false,
//                    estado_id: false,
//                    tipo_id: false
//                  }
//                },
//                convenio: {
//                  order: {
//                    id: 0,
//                    nombre: 1,
//                    activo: 2
//                  },
//                  visibility: {
//                    id: true,
//                    nombre: false,
//                    activo: false
//                  }
//                },
//                promocion: {
//                  order: {
//                    id: 0,
//                    promocion: 1,
//                    plazo: 2,
//                    numero_plazo: 3,
//                    cat: 4,
//                    tasa: 5
//                  },
//                  visibility: {
//                    id: true,
//                    promocion: false,
//                    plazo: false,
//                    numero_plazo: false,
//                    cat: false,
//                    tasa: false
//                  }
//                }
//              }
//            };
//            insertData(null, database, newUser, "user", "ID_User", false);
//            response.writeHead(200, {"Content-Type": "json/application"}); //Escribimos cabecera (Typo de contenido, texto tipo html)
//            response.end(JSON.stringify({
//              idUser: newUser.idUser,
//              activeStyle: newUser.activeStyle,
//              appMenuPosition: newUser.appMenuPosition,
//              appMenuOrder: newUser.appMenuOrder,
//              sidebarState: newUser.sidebarState,
//              sidebarBtnVisibility: newUser.sidebarBtnVisibility,
//              unviewedNotifications: newUser.unviewedNotifications,
//              gridConfig: newUser.gridConfig,
//              notifications: result2 ? result2 : [],
//              styles: [],
//              success: true
//            }));  //Terminamos respuesta
//          }
//        }
//      });
//	});
//}
function insertData(response, database, dataPost, table, idTable, shouldResponse){
	var counter = database.collection("counter");
	var myTable = database.collection(table);
	counter.findOne({_id: idTable}, {}, {strict: true}, function(error, result){
		if(error){
			console.log(error);
			response.writeHead(200, "application/json");
			response.end(JSON.stringify({success: false}));
		}
		else{
			if(result){
				counter.update({_id: idTable }, {$inc: {seq: 1 } }, {strict: true});
				dataPost._id = result.seq + 1;
			}
			else{
				counter.insert({ _id: idTable, seq: 1 }, {strict: true});
				dataPost._id = 1;
			}
			myTable.insert(dataPost, {strict: true}, function(error, result){
				if(error){
					if(shouldResponse){
						response.writeHead(200, "application/json");
						response.end(JSON.stringify({success: false}));
					}
				}
				else{
					if(shouldResponse){
						response.writeHead(200, "application/json");
						response.end(JSON.stringify({success: true}));
					}
				}
			});
		}
	});
}
function updateData(response, database, parameterData, dataToUpdate, table, shouldResponse){
	var myTable = database.collection(table);
	myTable.update(parameterData, { $set: dataToUpdate }, {strict: true}, function(error, result){
		if(error){
			if(shouldResponse){
				response.writeHead(200, "application/json");
				response.end(JSON.stringify({success: false}));
			}
		}
		else{
			if(shouldResponse){
				response.writeHead(200, "application/json");
				response.end(JSON.stringify({success: true}));
			}
		}
	});
}
function deleteData(response, database, parameterData, table, shouldResponse){
	var myTable = database.collection(table);
	myTable.deleteOne(parameterData, function(error, result){
		if(error){
			if(shouldResponse){
				response.writeHead(200, "application/json");
				response.end(JSON.stringify({success: false}));
			}
		}
		else{
			if(shouldResponse){
				response.writeHead(200, "application/json");
				response.end(JSON.stringify({success: true}));
			}
		}
	});
}
//function insertNotification(database, dataPost){
//	var counter = database.collection("counter");
//	var user = database.collection("user");
//	var notification = database.collection("notification");
//	counter.findOne({_id: "ID_Notification"}, {}, {strict: true}, function(error, result){
//		if(error)
//			console.log(error);
//		else{
//			if(result){
//				counter.update({_id: "ID_Notification" }, {$inc: {seq: 1 } }, {strict: true});
//				dataPost._id = result.seq + 1;
//			}
//			else{
//				counter.insert({ _id: "ID_Notification", seq: 1 }, {strict: true});
//				dataPost._id = 1;
//			}
//			notification.insert(dataPost, {strict: true}, function(error2, result2){
//				if(error2)
//					console.log(error2);
//				else{
//					user.update({_id: {$ne: dataPost.idUser}}, { $push: {unviewedNotifications: dataPost._id} }, {strict: true}, function(error3, result3){
//						if(error3)
//							console.log(error3);
//						else{
//							
//						}
//					});
//				}
//			});
//		}
//	});
//}
//function resetNotification(request, response, database, dataPost){
//	var user = database.collection("user");
//	user.update({idUser: dataPost.idUser}, { $set: {unviewedNotifications: []} }, {strict: true}, function(error, result){
//		if(error){
//			console.log(error);
//			response.writeHead(200, "application/json");
//			response.end(JSON.stringify({success: false}));
//		}
//		else{
//			request.alquimiaSession.userData.unviewedNotifications = [];
//			response.writeHead(200, "application/json");
//			response.end(JSON.stringify({success: true}));
//		}
//	});
//}
exports.checkSession = checkSession;
exports.checkNoSession = checkNoSession;
//exports.configUserData = configUserData;
exports.insertData = insertData;
exports.updateData = updateData;
exports.deleteData = deleteData;
//exports.insertNotification = insertNotification;
//exports.resetNotification = resetNotification;