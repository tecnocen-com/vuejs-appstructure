module.exports = function(init, activity, activityError){
  var me = this;
  
  this.config = init;
  
  this.initRequest = function(initResponse){
    
    this.create = function(name){
      
      this.init = new Vue({
        data: {
          name: name
        },
        methods: {
          get: function(getData, getSuccess, getError){
            var meInit = this,
            lastURL = '',
            localStatus = [true, 200],
            index = null;
            switch(typeof meInit.name){
              case 'object':
                switch(typeof getData.delimiters){
                  case 'object':
                    if(meInit.name.length === getData.delimiters.length ||
                    meInit.name.length - 1 === getData.delimiters.length){
                      for(index in meInit.name){
                        lastURL += meInit.name[index];
                        lastURL += (getData.delimiters[index]) ? '/' + getData.delimiters[index] : '';
                        lastURL += ( parseInt(index) < meInit.name.length -1 ) ? '/' : '?accessToken=' + initResponse.body.access_token;
                      }
                    }
                    else
                      localStatus = [false, 1];
                    break;
                  case 'number':
                    if(meInit.name.length <= 2){
                      for(index in meInit.name){
                        lastURL += meInit.name[index];
                        lastURL += (parseInt(index) === 0) ? '/' + getData.delimiters : '';
                        lastURL += ( parseInt(index) < meInit.name.length -1 ) ? '/' : '?accessToken=' + initResponse.body.access_token;
                      }
                    }
                    else
                      localStatus = [false, 1];
                    break;
                  case 'string':
                    if(meInit.name.length <= 2){
                      for(index in meInit.name){
                        lastURL += meInit.name[index];
                        lastURL += (parseInt(index) === 0) ? '/' + getData.delimiters : '';
                        lastURL += ( parseInt(index) < meInit.name.length -1 ) ? '/' : '?accessToken=' + initResponse.body.access_token;
                      }
                    }
                    else
                      localStatus = [false, 1];
                    break;
                    case 'undefined':
                      if(meInit.name.length === 1)
                        lastURL += meInit.name[0] + '?accessToken=' + initResponse.body.access_token;
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
                        lastURL += meInit.name;
                        lastURL += '/' + getData.delimiters[index];
                        lastURL += '?accessToken=' + initResponse.body.access_token;
                      }
                    }
                    else
                      localStatus = [false, 1];
                    break;
                  case 'number':
                    lastURL += meInit.name + '/' + getData.delimiters;
                    lastURL += '?accessToken=' + initResponse.body.access_token;
                    break;
                  case 'string':
                    lastURL += meInit.name + '/' + getData.delimiters;
                    lastURL += '?accessToken=' + initResponse.body.access_token;
                    break;
                  case 'undefined':
                    lastURL += meInit.name;
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
                        lastURL += meInit.name;
                        lastURL += '/' + getData.delimiters[index];
                        lastURL += '?accessToken=' + initResponse.body.access_token;
                      }
                    }
                    else
                      localStatus = [false, 1];
                    break;
                  case 'number':
                    lastURL += meInit.name + '/' + getData.delimiters;
                    lastURL += '?accessToken=' + initResponse.body.access_token;
                    break;
                  case 'string':
                    lastURL += meInit.name + '/' + getData.delimiters;
                    lastURL += '?accessToken=' + initResponse.body.access_token;
                    break;
                  case 'undefined':
                    lastURL += meInit.name;
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
                this.$http.get(me.config.baseURL + me.config.dataURL + lastURL, {
                  params: getData.params
                }).then(getSuccess, getError);
              else
                this.$http.get(me.config.baseURL + me.config.dataURL + lastURL).then(getSuccess, getError);
                  
              //var anHttpRequest = new XMLHttpRequest();
              //anHttpRequest.onreadystatechange = function() { 
              //    if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
              //        getSuccess(anHttpRequest);
              //};
              //anHttpRequest.open( "GET", me.config.baseURL + me.config.dataURL + lastURL, true );
              //anHttpRequest.send( 200 );
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
            var meInit = this,
              lastURL = '',
              localStatus = [true, 200],
              index = null;
            switch(typeof meInit.name){
              case 'object':
                switch(typeof getData.delimiters){
                  case 'object':
                    if(meInit.name.length === getData.delimiters.length ||
                    meInit.name.length - 1 === getData.delimiters.length){
                      for(index in meInit.name){
                        lastURL += meInit.name[index];
                        lastURL += (getData.delimiters[index]) ? '/' + getData.delimiters[index] : '';
                        lastURL += ( parseInt(index) < meInit.name.length -1 ) ? '/' : '?accessToken=' + initResponse.body.access_token;
                      }
                    }
                    else
                      localStatus = [false, 1];
                    break;
                  case 'number':
                    if(meInit.name.length <= 2){
                      for(index in meInit.name){
                        lastURL += meInit.name[index];
                        lastURL += (parseInt(index) === 0) ? '/' + getData.delimiters : '';
                        lastURL += ( parseInt(index) < meInit.name.length -1 ) ? '/' : '?accessToken=' + initResponse.body.access_token;
                      }
                    }
                    else
                      localStatus = [false, 1];
                    break;
                  case 'string':
                    if(meInit.name.length <= 2){
                      for(index in meInit.name){
                        lastURL += meInit.name[index];
                        lastURL += (parseInt(index) === 0) ? '/' + getData.delimiters : '';
                        lastURL += ( parseInt(index) < meInit.name.length -1 ) ? '/' : '?accessToken=' + initResponse.body.access_token;
                      }
                    }
                    else
                      localStatus = [false, 1];
                    break;
                  case 'undefined':
                    if(meInit.name.length === 1)
                      lastURL += meInit.name[0] + '?accessToken=' + initResponse.body.access_token;
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
                        lastURL += meInit.name;
                        lastURL += '/' + getData.delimiters[index];
                        lastURL += '?accessToken=' + initResponse.body.access_token;
                      }
                    }
                    else
                      localStatus = [false, 1];
                    break;
                  case 'number':
                    lastURL += meInit.name + '/' + getData.delimiters;
                    lastURL += '?accessToken=' + initResponse.body.access_token;
                    break;
                  case 'string':
                    lastURL += meInit.name + '/' + getData.delimiters;
                    lastURL += '?accessToken=' + initResponse.body.access_token;
                    break;
                  case 'undefined':
                    lastURL += meInit.name;
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
                        lastURL += meInit.name;
                        lastURL += '/' + getData.delimiters[index];
                        lastURL += '?accessToken=' + initResponse.body.access_token;
                      }
                    }
                    else
                      localStatus = [false, 1];
                    break;
                  case 'number':
                    lastURL += meInit.name + '/' + getData.delimiters;
                    lastURL += '?accessToken=' + initResponse.body.access_token;
                    break;
                  case 'string':
                    lastURL += meInit.name + '/' + getData.delimiters;
                    lastURL += '?accessToken=' + initResponse.body.access_token;
                    break;
                  case 'undefined':
                    lastURL += meInit.name;
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
                this.$http.post(me.config.baseURL + me.config.dataURL + lastURL,
                getData.params,
                {
                  emulateJSON: true
                }).then(getSuccess, getError);
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
            var meInit = this,
              lastURL = '',
              localStatus = [true, 200],
              index = null;
            switch(typeof meInit.name){
              case 'object':
                switch(typeof getData.delimiters){
                  case 'object':
                    if(meInit.name.length === getData.delimiters.length ||
                    meInit.name.length - 1 === getData.delimiters.length){
                      for(index in meInit.name){
                        lastURL += meInit.name[index];
                        lastURL += (getData.delimiters[index]) ? '/' + getData.delimiters[index] : '';
                        lastURL += ( parseInt(index) < meInit.name.length -1 ) ? '/' : '?accessToken=' + initResponse.body.access_token;
                      }
                    }
                    else
                      localStatus = [false, 1];
                    break;
                  case 'number':
                    if(meInit.name.length <= 2){
                      for(index in meInit.name){
                        lastURL += meInit.name[index];
                        lastURL += (parseInt(index) === 0) ? '/' + getData.delimiters : '';
                        lastURL += ( parseInt(index) < meInit.name.length -1 ) ? '/' : '?accessToken=' + initResponse.body.access_token;
                      }
                    }
                    else
                      localStatus = [false, 1];
                    break;
                  case 'string':
                    if(meInit.name.length <= 2){
                      for(index in meInit.name){
                        lastURL += meInit.name[index];
                        lastURL += (parseInt(index) === 0) ? '/' + getData.delimiters : '';
                        lastURL += ( parseInt(index) < meInit.name.length -1 ) ? '/' : '?accessToken=' + initResponse.body.access_token;
                      }
                    }
                    else
                      localStatus = [false, 1];
                    break;
                  case 'undefined':
                    if(meInit.name.length === 1)
                      lastURL += meInit.name[0] + '?accessToken=' + initResponse.body.access_token;
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
                        lastURL += meInit.name;
                        lastURL += '/' + getData.delimiters[index];
                        lastURL += '?accessToken=' + initResponse.body.access_token;
                      }
                    }
                    else
                      localStatus = [false, 1];
                    break;
                  case 'number':
                    lastURL += meInit.name + '/' + getData.delimiters;
                    lastURL += '?accessToken=' + initResponse.body.access_token;
                    break;
                  case 'string':
                    lastURL += meInit.name + '/' + getData.delimiters;
                    lastURL += '?accessToken=' + initResponse.body.access_token;
                    break;
                  case 'undefined':
                    lastURL += meInit.name;
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
                        lastURL += meInit.name;
                        lastURL += '/' + getData.delimiters[index];
                        lastURL += '?accessToken=' + initResponse.body.access_token;
                      }
                    }
                    else
                      localStatus = [false, 1];
                    break;
                  case 'number':
                    lastURL += meInit.name + '/' + getData.delimiters;
                    lastURL += '?accessToken=' + initResponse.body.access_token;
                    break;
                  case 'string':
                    lastURL += meInit.name + '/' + getData.delimiters;
                    lastURL += '?accessToken=' + initResponse.body.access_token;
                    break;
                  case 'undefined':
                    lastURL += meInit.name;
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
                this.$http.patch(me.config.baseURL + me.config.dataURL + lastURL,
                getData.params,
                {
                  emulateJSON: true
                }).then(getSuccess, getError);
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
            var meInit = this,
              lastURL = '',
              localStatus = [true, 200],
              index = null;
            switch(typeof meInit.name){
              case 'object':
                  switch(typeof getData.delimiters){
                      case 'object':
                          if(meInit.name.length === getData.delimiters.length ||
                             meInit.name.length - 1 === getData.delimiters.length){
                              for(index in meInit.name){
                                  lastURL += meInit.name[index];
                                  lastURL += (getData.delimiters[index]) ? '/' + getData.delimiters[index] : '';
                                  lastURL += ( parseInt(index) < meInit.name.length -1 ) ? '/' : '?accessToken=' + initResponse.body.access_token;
                              }
                          }
                          else
                              localStatus = [false, 1];
                          break;
                      case 'number':
                          if(meInit.name.length <= 2){
                              for(index in meInit.name){
                                  lastURL += meInit.name[index];
                                  lastURL += (parseInt(index) === 0) ? '/' + getData.delimiters : '';
                                  lastURL += ( parseInt(index) < meInit.name.length -1 ) ? '/' : '?accessToken=' + initResponse.body.access_token;
                              }
                          }
                          else
                              localStatus = [false, 1];
                          break;
                      case 'string':
                          if(meInit.name.length <= 2){
                              for(index in meInit.name){
                                  lastURL += meInit.name[index];
                                  lastURL += (parseInt(index) === 0) ? '/' + getData.delimiters : '';
                                  lastURL += ( parseInt(index) < meInit.name.length -1 ) ? '/' : '?accessToken=' + initResponse.body.access_token;
                              }
                          }
                          else
                              localStatus = [false, 1];
                          break;
                      case 'undefined':
                          if(meInit.name.length === 1)
                                  lastURL += meInit.name[0] + '?accessToken=' + initResponse.body.access_token;
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
                          lastURL += meInit.name;
                          lastURL += '/' + getData.delimiters[index];
                          lastURL += '?accessToken=' + initResponse.body.access_token;
                        }
                      }
                      else
                        localStatus = [false, 1];
                      break;
                    case 'number':
                      lastURL += meInit.name + '/' + getData.delimiters;
                      lastURL += '?accessToken=' + initResponse.body.access_token;
                      break;
                    case 'string':
                      lastURL += meInit.name + '/' + getData.delimiters;
                      lastURL += '?accessToken=' + initResponse.body.access_token;
                      break;
                    case 'undefined':
                      lastURL += meInit.name;
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
                        lastURL += meInit.name;
                        lastURL += '/' + getData.delimiters[index];
                        lastURL += '?accessToken=' + initResponse.body.access_token;
                      }
                    }
                    else
                      localStatus = [false, 1];
                    break;
                  case 'number':
                    lastURL += meInit.name + '/' + getData.delimiters;
                    lastURL += '?accessToken=' + initResponse.body.access_token;
                    break;
                  case 'string':
                    lastURL += meInit.name + '/' + getData.delimiters;
                    lastURL += '?accessToken=' + initResponse.body.access_token;
                    break;
                  case 'undefined':
                    lastURL += meInit.name;
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
                this.$http.delete(me.config.baseURL + me.config.dataURL + lastURL, { params: getData.params }).then(getSuccess, getError);
              else
                this.$http.delete(me.config.baseURL + me.config.dataURL + lastURL).then(getSuccess, getError);
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
        }
      });
      return this.init;
    };
    return this.create;
  };
  
  this.config.getToken = new Vue({
    data:{
      tokenResponse: {
        success: function(response){
          activity(me.initRequest(response));
        },
        error: function(response){
          activityError(response);
        }
      }
    },
    methods: {
      initToken: function(){
        var autoResponse = {};
        if(typeof me.config.token === "string"){
          autoResponse.body = {
            access_token: me.config.token
          };
          this.tokenResponse.success(autoResponse);
        }
        else{
          this.$http.post(me.config.baseURL + me.config.tokenURL, 
          me.config.accessData.body,
          {
              emulateJSON: (me.config.contentType === "application/x-www-form-urlencoded") ? true : false,
              headers: me.config.accessData.headers,
              //before: function(req){
              //    console.log(req);
              //}
          }).then(this.tokenResponse.success, this.tokenResponse.error);
        }
      },
    }
  });
  
  this.config.getToken.initToken();
};