///////////////////////////////////USE EXAMPLES/////////////////////////////////
//me.models.form.post({
//  params: {
//    name: "My new form"
//  }
//},
//function(success){
//  console.log("POST", success);
//},
//function(error){
//  console.log(error);
//});
//
//me.models.form.patch({
//  delimiters: 6,
//  params: {
//    name: "My edited test form"
//  }
//},
//function(success){
//  console.log("PATCH", success);
//},
//function(error){
//  console.log(error);
//});
//
//me.models.form.remove({
//  delimiters: 6,
//  params: {}
//},
//function(success){
//  console.log("REMOVE", success);
//},
//function(error){
//  console.log(error);
//});
//
//me.models.form.get({},
//function(success){
//  console.log("GET", success);
//},
//function(error){
//  console.log(error);
//});
////////////////////////////////////////////////////////////////////
var querystring = require("querystring");
module.exports = function(init, activity, activityError){
  var me = this;
  
  this.config = init;
  this.initRequest = function(initResponse){
    this.create = function(name){
      this.init = {
        get: function(getData, getSuccess, getError){
          var lastURL = '',
          localStatus = [true, 200],
          index = 0;
          switch(typeof name){
            case 'object':
              switch(typeof getData.delimiters){
                case 'object':
                  if(name.length === getData.delimiters.length ||
                  name.length - 1 === getData.delimiters.length){
                    for(; index < name.length; index++){
                      lastURL += name[index];
                      lastURL += (getData.delimiters[index]) ? '/' + getData.delimiters[index] : '';
                      lastURL += ( parseInt(index) < name.length -1 ) ? '/' : '?accessToken=' + initResponse.body.access_token;
                    }
                  }
                  else
                    localStatus = [false, 1];
                  break;
                case 'number':
                  if(name.length <= 2){
                    for(index = 0; index < name.length; index++){
                      lastURL += name[index];
                      lastURL += (parseInt(index) === 0) ? '/' + getData.delimiters : '';
                      lastURL += ( parseInt(index) < name.length -1 ) ? '/' : '?accessToken=' + initResponse.body.access_token;
                    }
                  }
                  else
                    localStatus = [false, 1];
                  break;
                case 'string':
                  if(name.length <= 2){
                    for(index = 0; index < name.length; index++){
                      lastURL += name[index];
                      lastURL += (parseInt(index) === 0) ? '/' + getData.delimiters : '';
                      lastURL += ( parseInt(index) < name.length -1 ) ? '/' : '?accessToken=' + initResponse.body.access_token;
                    }
                  }
                  else
                    localStatus = [false, 1];
                  break;
                  case 'undefined':
                    if(name.length === 1)
                      lastURL += name[0] + '?accessToken=' + initResponse.body.access_token;
                    else
                      localStatus = [false, 1];
                    break;
                  default:
                      localStatus = [false, 2];
                      break;
              }
              break;
            case 'string':
              switch(typeof getData.delimiters){
                case 'object':
                  if(getData.delimiters.length === 1){
                    for(; index < getData.delimiters.length; index++){
                      lastURL += name;
                      lastURL += '/' + getData.delimiters[index];
                      lastURL += '?accessToken=' + initResponse.body.access_token;
                    }
                  }
                  else
                    localStatus = [false, 1];
                  break;
                case 'number':
                  lastURL += name + '/' + getData.delimiters;
                  lastURL += '?accessToken=' + initResponse.body.access_token;
                  break;
                case 'string':
                  lastURL += name + '/' + getData.delimiters;
                  lastURL += '?accessToken=' + initResponse.body.access_token;
                  break;
                case 'undefined':
                  lastURL += name;
                  lastURL += '?accessToken=' + initResponse.body.access_token;
                  break;
                default:
                  localStatus = [false, 2];
                  break;
              }
              break;
            case 'number':
              switch(typeof getData.delimiters){
                case 'object':
                  if(getData.delimiters.length === 1){
                    for(; index < getData.delimiters.length; index++){
                      lastURL += name;
                      lastURL += '/' + getData.delimiters[index];
                      lastURL += '?accessToken=' + initResponse.body.access_token;
                    }
                  }
                  else
                    localStatus = [false, 1];
                  break;
                case 'number':
                  lastURL += name + '/' + getData.delimiters;
                  lastURL += '?accessToken=' + initResponse.body.access_token;
                  break;
                case 'string':
                  lastURL += name + '/' + getData.delimiters;
                  lastURL += '?accessToken=' + initResponse.body.access_token;
                  break;
                case 'undefined':
                  lastURL += name;
                  lastURL += '?accessToken=' + initResponse.body.access_token;
                  break;
                default:
                  localStatus = [false, 2];
                  break;
              }
              break;
            default:
              localStatus = [false, 3];
              break;
          }
          if(localStatus[0] && localStatus[1] === 200){
            if(typeof getData.params === "object" && !getData.params.length)
              axios.get(me.config.baseURL + me.config.dataURL + lastURL, { params: querystring.stringify(getData.params) })
              .then(getSuccess)
              .catch(getError);
            else
              axios.get(me.config.baseURL + me.config.dataURL + lastURL)
              .then(getSuccess)
              .catch(getError);
          }
          else{
            var error = 'ERROR: Incorrect way of initialization of object names creation or "delimiters".',
              objectError = {
              message: 'Incorrect way of initialization of object names creation or "delimiters".'
            };
            switch(localStatus[1]){
              case 1:
                error += ' Code: 400-' + localStatus[1] + '. incorrect way of initialization of relation between object names creation and "delimiters".';
                objectError.code = '400-'+localStatus[1];
                objectError.toCheck = 'Incorrect way of initialization of relation between object names creation and "delimiters".';
                break;
              case 2:
                error += ' Code: 400-' + localStatus[1] + '. incorrect type of "delimiters".';
                objectError.code = '400-'+localStatus[1];
                objectError.toCheck = 'Incorrect type of "delimiters".';
                break;
              case 3:
                error += ' Code: 400-' + localStatus[1] + '. incorrect type of object names.';
                objectError.code = '400-'+localStatus[1];
                objectError.toCheck = 'Incorrect type of object names.';
                break;
              default:      
            }
            console.error(error);
            getError(objectError);
          }
        },
        post: function(getData, getSuccess, getError){
          var lastURL = '',
            localStatus = [true, 200],
            index = null;
          switch(typeof name){
            case 'object':
              switch(typeof getData.delimiters){
                case 'object':
                  if(name.length === getData.delimiters.length ||
                  name.length - 1 === getData.delimiters.length){
                    for(index in name){
                      lastURL += name[index];
                      lastURL += (getData.delimiters[index]) ? '/' + getData.delimiters[index] : '';
                      lastURL += ( parseInt(index) < name.length -1 ) ? '/' : '?accessToken=' + initResponse.body.access_token;
                    }
                  }
                  else
                    localStatus = [false, 1];
                  break;
                case 'number':
                  if(name.length <= 2){
                    for(index in name){
                      lastURL += name[index];
                      lastURL += (parseInt(index) === 0) ? '/' + getData.delimiters : '';
                      lastURL += ( parseInt(index) < name.length -1 ) ? '/' : '?accessToken=' + initResponse.body.access_token;
                    }
                  }
                  else
                    localStatus = [false, 1];
                  break;
                case 'string':
                  if(name.length <= 2){
                    for(index in name){
                      lastURL += name[index];
                      lastURL += (parseInt(index) === 0) ? '/' + getData.delimiters : '';
                      lastURL += ( parseInt(index) < name.length -1 ) ? '/' : '?accessToken=' + initResponse.body.access_token;
                    }
                  }
                  else
                    localStatus = [false, 1];
                  break;
                case 'undefined':
                  if(name.length === 1)
                    lastURL += name[0] + '?accessToken=' + initResponse.body.access_token;
                  else
                    localStatus = [false, 1];
                  break;
                default:
                  localStatus = [false, 2];
                  break;
              }
              break;
            case 'string':
              switch(typeof getData.delimiters){
                case 'object':
                  if(getData.delimiters.length === 1){
                    for(index in getData.delimiters){
                      lastURL += name;
                      lastURL += '/' + getData.delimiters[index];
                      lastURL += '?accessToken=' + initResponse.body.access_token;
                    }
                  }
                  else
                    localStatus = [false, 1];
                  break;
                case 'number':
                  lastURL += name + '/' + getData.delimiters;
                  lastURL += '?accessToken=' + initResponse.body.access_token;
                  break;
                case 'string':
                  lastURL += name + '/' + getData.delimiters;
                  lastURL += '?accessToken=' + initResponse.body.access_token;
                  break;
                case 'undefined':
                  lastURL += name;
                  lastURL += '?accessToken=' + initResponse.body.access_token;
                  break;
                default:
                  localStatus = [false, 2];
                  break;
              }
              break;
            case 'number':
              switch(typeof getData.delimiters){
                case 'object':
                  if(getData.delimiters.length === 1){
                    for(index in getData.delimiters){
                      lastURL += name;
                      lastURL += '/' + getData.delimiters[index];
                      lastURL += '?accessToken=' + initResponse.body.access_token;
                    }
                  }
                  else
                    localStatus = [false, 1];
                  break;
                case 'number':
                  lastURL += name + '/' + getData.delimiters;
                  lastURL += '?accessToken=' + initResponse.body.access_token;
                  break;
                case 'string':
                  lastURL += name + '/' + getData.delimiters;
                  lastURL += '?accessToken=' + initResponse.body.access_token;
                  break;
                case 'undefined':
                  lastURL += name;
                  lastURL += '?accessToken=' + initResponse.body.access_token;
                  break;
                default:
                  localStatus = [false, 2];
                  break;
              }
              break;
            default:
              localStatus = [false, 3];
              break;
          }
          if(localStatus[0] && localStatus[1] === 200){
            if(typeof getData.params === "object" && !getData.params.length)
              axios.post(me.config.baseURL + me.config.dataURL + lastURL, querystring.stringify(getData.params))
              .then(getSuccess)
              .catch(getError);
            else{
              var paramsError = ' Code: 400-4. incorrect way of initialization of "params".',
                paramsObjectError = {
                  message: 'Incorrect way of initialization of object names creation or "delimiters".',
                  code: '400-4',
                  toCheck: 'Incorrect way of initialization of "params".'
              };
              console.error(paramsError);
              getError(paramsObjectError);
            }
          }
          else{
            var error = 'ERROR: Incorrect way of initialization of object names creation or "delimiters".';
            var objectError = {
              message: 'Incorrect way of initialization of object names creation or "delimiters".'
            };
            switch(localStatus[1]){
              case 1:
                error += ' Code: 400-' + localStatus[1] + '. incorrect way of initialization of relation between object names creation and "delimiters".';
                objectError.code = '400-'+localStatus[1];
                objectError.toCheck = 'Incorrect way of initialization of relation between object names creation and "delimiters".';
                break;
              case 2:
                error += ' Code: 400-' + localStatus[1] + '. incorrect type of "delimiters".';
                objectError.code = '400-'+localStatus[1];
                objectError.toCheck = 'Incorrect type of "delimiters".';
                break;
              case 3:
                error += ' Code: 400-' + localStatus[1] + '. incorrect type of object names.';
                objectError.code = '400-'+localStatus[1];
                objectError.toCheck = 'Incorrect type of object names.';
                break;
              default:
                  
            }
            console.error(error);
            getError(objectError);
          }
        },
        patch: function(getData, getSuccess, getError){
          var lastURL = '',
            localStatus = [true, 200],
            index = null;
          switch(typeof name){
            case 'object':
              switch(typeof getData.delimiters){
                case 'object':
                  if(name.length === getData.delimiters.length ||
                  name.length - 1 === getData.delimiters.length){
                    for(index in name){
                      lastURL += name[index];
                      lastURL += (getData.delimiters[index]) ? '/' + getData.delimiters[index] : '';
                      lastURL += ( parseInt(index) < name.length -1 ) ? '/' : '?accessToken=' + initResponse.body.access_token;
                    }
                  }
                  else
                    localStatus = [false, 1];
                  break;
                case 'number':
                  if(name.length <= 2){
                    for(index in name){
                      lastURL += name[index];
                      lastURL += (parseInt(index) === 0) ? '/' + getData.delimiters : '';
                      lastURL += ( parseInt(index) < name.length -1 ) ? '/' : '?accessToken=' + initResponse.body.access_token;
                    }
                  }
                  else
                    localStatus = [false, 1];
                  break;
                case 'string':
                  if(name.length <= 2){
                    for(index in name){
                      lastURL += name[index];
                      lastURL += (parseInt(index) === 0) ? '/' + getData.delimiters : '';
                      lastURL += ( parseInt(index) < name.length -1 ) ? '/' : '?accessToken=' + initResponse.body.access_token;
                    }
                  }
                  else
                    localStatus = [false, 1];
                  break;
                case 'undefined':
                  if(name.length === 1)
                    lastURL += name[0] + '?accessToken=' + initResponse.body.access_token;
                  else
                    localStatus = [false, 1];
                  break;
                default:
                  localStatus = [false, 2];      
                  break;
              }
              break;
            case 'string':
              switch(typeof getData.delimiters){
                case 'object':
                  if(getData.delimiters.length === 1){
                    for(index in getData.delimiters){
                      lastURL += name;
                      lastURL += '/' + getData.delimiters[index];
                      lastURL += '?accessToken=' + initResponse.body.access_token;
                    }
                  }
                  else
                    localStatus = [false, 1];
                  break;
                case 'number':
                  lastURL += name + '/' + getData.delimiters;
                  lastURL += '?accessToken=' + initResponse.body.access_token;
                  break;
                case 'string':
                  lastURL += name + '/' + getData.delimiters;
                  lastURL += '?accessToken=' + initResponse.body.access_token;
                  break;
                case 'undefined':
                  lastURL += name;
                  lastURL += '?accessToken=' + initResponse.body.access_token;
                  break;
                default:
                  localStatus = [false, 2];
                  break;
              }
              break;
            case 'number':
              switch(typeof getData.delimiters){
                case 'object':
                  if(getData.delimiters.length === 1){
                    for(index in getData.delimiters){
                      lastURL += name;
                      lastURL += '/' + getData.delimiters[index];
                      lastURL += '?accessToken=' + initResponse.body.access_token;
                    }
                  }
                  else
                    localStatus = [false, 1];
                  break;
                case 'number':
                  lastURL += name + '/' + getData.delimiters;
                  lastURL += '?accessToken=' + initResponse.body.access_token;
                  break;
                case 'string':
                  lastURL += name + '/' + getData.delimiters;
                  lastURL += '?accessToken=' + initResponse.body.access_token;
                  break;
                case 'undefined':
                  lastURL += name;
                  lastURL += '?accessToken=' + initResponse.body.access_token;
                  break;
                default:
                  localStatus = [false, 2];
                  break;
              }
              break;
            default:
              localStatus = [false, 3];
              break;
          }
          if(localStatus[0] && localStatus[1] === 200){
            if(typeof getData.params === "object" && !getData.params.length)
              axios.patch(me.config.baseURL + me.config.dataURL + lastURL, querystring.stringify(getData.params))
              .then(getSuccess)
              .catch(getError);
            else{
              var paramsError = ' Code: 400-4. incorrect way of initialization of "params".',
                paramsObjectError = {
                  message: 'Incorrect way of initialization of object names creation or "delimiters".',
                  code: '400-4',
                  toCheck: 'Incorrect way of initialization of "params".'
              };
              console.error(paramsError);
              getError(paramsObjectError);
            }
          }
          else{
            var error = 'ERROR: Incorrect way of initialization of object names creation or "delimiters".';
            var objectError = {
              message: 'Incorrect way of initialization of object names creation or "delimiters".'
            };
            switch(localStatus[1]){
              case 1:
                error += ' Code: 400-' + localStatus[1] + '. incorrect way of initialization of relation between object names creation and "delimiters".';
                objectError.code = '400-'+localStatus[1];
                objectError.toCheck = 'Incorrect way of initialization of relation between object names creation and "delimiters".';
                break;
              case 2:
                error += ' Code: 400-' + localStatus[1] + '. incorrect type of "delimiters".';
                objectError.code = '400-'+localStatus[1];
                objectError.toCheck = 'Incorrect type of "delimiters".';
                break;
              case 3:
                error += ' Code: 400-' + localStatus[1] + '. incorrect type of object names.';
                objectError.code = '400-'+localStatus[1];
                objectError.toCheck = 'Incorrect type of object names.';
                break;
              default:
                    
            }
            console.error(error);
            getError(objectError);
          }
        },
        remove: function(getData, getSuccess, getError){
          var lastURL = '',
            localStatus = [true, 200],
            index = null;
          switch(typeof name){
            case 'object':
                switch(typeof getData.delimiters){
                    case 'object':
                        if(name.length === getData.delimiters.length ||
                           name.length - 1 === getData.delimiters.length){
                            for(index in name){
                                lastURL += name[index];
                                lastURL += (getData.delimiters[index]) ? '/' + getData.delimiters[index] : '';
                                lastURL += ( parseInt(index) < name.length -1 ) ? '/' : '?accessToken=' + initResponse.body.access_token;
                            }
                        }
                        else
                            localStatus = [false, 1];
                        break;
                    case 'number':
                        if(name.length <= 2){
                            for(index in name){
                                lastURL += name[index];
                                lastURL += (parseInt(index) === 0) ? '/' + getData.delimiters : '';
                                lastURL += ( parseInt(index) < name.length -1 ) ? '/' : '?accessToken=' + initResponse.body.access_token;
                            }
                        }
                        else
                            localStatus = [false, 1];
                        break;
                    case 'string':
                        if(name.length <= 2){
                            for(index in name){
                                lastURL += name[index];
                                lastURL += (parseInt(index) === 0) ? '/' + getData.delimiters : '';
                                lastURL += ( parseInt(index) < name.length -1 ) ? '/' : '?accessToken=' + initResponse.body.access_token;
                            }
                        }
                        else
                            localStatus = [false, 1];
                        break;
                    case 'undefined':
                        if(name.length === 1)
                                lastURL += name[0] + '?accessToken=' + initResponse.body.access_token;
                        else
                            localStatus = [false, 1];
                        break;
                    default:
                        localStatus = [false, 2];
                        
                        break;
                }
                break;
            case 'string':
                switch(typeof getData.delimiters){
                  case 'object':
                    if(getData.delimiters.length === 1){
                      for(index in getData.delimiters){
                        lastURL += name;
                        lastURL += '/' + getData.delimiters[index];
                        lastURL += '?accessToken=' + initResponse.body.access_token;
                      }
                    }
                    else
                      localStatus = [false, 1];
                    break;
                  case 'number':
                    lastURL += name + '/' + getData.delimiters;
                    lastURL += '?accessToken=' + initResponse.body.access_token;
                    break;
                  case 'string':
                    lastURL += name + '/' + getData.delimiters;
                    lastURL += '?accessToken=' + initResponse.body.access_token;
                    break;
                  case 'undefined':
                    lastURL += name;
                    lastURL += '?accessToken=' + initResponse.body.access_token;
                    break;
                  default:
                    localStatus = [false, 2];
                    break;
                }
                break;
            case 'number':
              switch(typeof getData.delimiters){
                case 'object':
                  if(getData.delimiters.length === 1){
                    for(index in getData.delimiters){
                      lastURL += name;
                      lastURL += '/' + getData.delimiters[index];
                      lastURL += '?accessToken=' + initResponse.body.access_token;
                    }
                  }
                  else
                    localStatus = [false, 1];
                  break;
                case 'number':
                  lastURL += name + '/' + getData.delimiters;
                  lastURL += '?accessToken=' + initResponse.body.access_token;
                  break;
                case 'string':
                  lastURL += name + '/' + getData.delimiters;
                  lastURL += '?accessToken=' + initResponse.body.access_token;
                  break;
                case 'undefined':
                  lastURL += name;
                  lastURL += '?accessToken=' + initResponse.body.access_token;
                  break;
                default:
                  localStatus = [false, 2];
                  break;
              }
              break;
            default:
              localStatus = [false, 3];
              break;
          }
          if(localStatus[0] && localStatus[1] === 200)
            if(typeof getData.params === "object" && !getData.params.length)
              axios.delete(me.config.baseURL + me.config.dataURL + lastURL, { params: querystring.stringify(getData.params) })
              .then(getSuccess)
              .catch(getError);
            else
              axios.delete(me.config.baseURL + me.config.dataURL + lastURL)
              .then(getSuccess)
              .catch(getError);
          else{
            var error = 'ERROR: Incorrect way of initialization of object names creation or "delimiters".';
            var objectError = {
                message: 'Incorrect way of initialization of object names creation or "delimiters".'
            };
            switch(localStatus[1]){
              case 1:
                error += ' Code: 400-' + localStatus[1] + '. incorrect way of initialization of relation between object names creation and "delimiters".';
                objectError.code = '400-'+localStatus[1];
                objectError.toCheck = 'Incorrect way of initialization of relation between object names creation and "delimiters".';
                break;
              case 2:
                error += ' Code: 400-' + localStatus[1] + '. incorrect type of "delimiters".';
                objectError.code = '400-'+localStatus[1];
                objectError.toCheck = 'Incorrect type of "delimiters".';
                break;
              case 3:
                error += ' Code: 400-' + localStatus[1] + '. incorrect type of object names.';
                objectError.code = '400-'+localStatus[1];
                objectError.toCheck = 'Incorrect type of object names.';
                break;
              default:
            }
            console.error(error);
            getError(objectError);
          }
        }
      };
      return this.init;
    };
    return this.create;
  };
  
  this.config.getToken = {
    initToken: function(){
      var autoResponse = {};
      if(typeof me.config.token === "string"){
        autoResponse.body = {
          access_token: me.config.token
        };
        me.config.getToken.tokenResponse.success(autoResponse);
      }
    },
    tokenResponse: {
      success: function(response){
        activity(me.initRequest(response));
      },
      error: function(response){
        activityError(response);
      }
    }
  };
  
  this.config.getToken.initToken();
};