BUTO.requires = {
    templates: {
        login: require("./loginT.js")
    }
};
BUTO.components = {
    login: new Vue({
        el: "#login",
        template: BUTO.requires.templates.login,
        data: {
            hidden: true,
            error: 0,
            mainMessage: {
                title: "Bienvenido",
                subtitle: "Ingrese a su cuenta"
            },
            animationClass: ['fade-efect-hide', 'fade-efect-show'],
            user: {
                hidden: false,
                animate: false,
                data: "",
                label: "Usuario"
            },
            password: {
                hidden: true,
                animate: true,
                data: "",
                label: "Contraseña"
            },
            alert: {
                hidden: true,
                animate: false,
                message: ""
            },
            button: {
                loading: false,
                message: "Continuar",
                forgotten: "¿Olvidaste tu contraseña?"
            }
        },
        methods: {
            login: function(){
                var me = this,
                    validator = true;
                this.button.loading = true;
                validator *= this.user.data === "" ? false : true;
                validator = validator === 1 ? true : false;
                if(!validator){
                    this.alert.message = "Error, se requiere un nombre de usuario.";
                    this.alert.hidden = false;
                    this.error = 0;
                    this.button.loading = false;
                    setTimeout(function(){me.alertAnimation("hide");}, 1500);
                }
                else{
                    validator *= this.password.data === "" ? false : true;
                    validator = validator === 1 ? true : false;
                    if(!validator){
                        this.alert.message = "Error, se requiere una contraseña.";
                        this.alert.hidden = false;
                        this.error = 1;
                        this.button.loading = false;
                        setTimeout(function(){me.alertAnimation("hide");}, 1500);
                    }
                    else{
                        validator *= !this.fieldValidation(this.user.data);
                        validator = validator === 1 ? true : false;
                        if(!validator){
                            this.alert.message = "Error, caracteres inválidos, inténtalo de nuevo.";
                            this.alert.hidden = false;
                            this.error = 0;
                            this.button.loading = false;
                            setTimeout(function(){me.alertAnimation("hide");}, 1500);
                        }
                        else
                            this.$http.post("/login",
                                {
                                    user: this.user.data,
                                    pass: this.password.data
                                }
                            ).then(function(response){
                                if(response.status === 200 && response.body.status !== 401){
                                    window.location = "/home";
                                }
                                else{
                                    me.alert.message = response.body.message;
                                    me.alert.hidden = false;
                                    me.error = 2;
                                    this.button.loading = false;
                                    setTimeout(function(){me.alertAnimation("hide");}, 1500);
                                }
                            });
                    }
                }
            },
            alertAnimation: function(anim){
                var me = this,
                    message = document.getElementById("message");
                if(message){
                    this.alert.animate = anim === "show" ? false : true;
                    messageAnimation = this.detectAnimation(message);
                    messageAnimation && message.addEventListener(messageAnimation, function(e){
                        if(e.animationName === "fade-efect-hide"){
                            me.alert.hidden = true;
                            me.alert.animate = false;
                        }
                        else{
                            //me.alert.show = true;
                        }
                    });
                }
            },
            noMessageAnimation: function(){
                var noMessage = document.getElementById("noMessage");
                if(noMessage){
                    noMessageAnimation = this.detectAnimation(noMessage);
                    noMessageAnimation && noMessage.addEventListener(noMessageAnimation, function(e){
                        if(e.animationName === "fade-efect-hide"){
                            
                        }
                        else{
                            
                        }
                    });
                }
            },
            detectAnimation: function(el){
                var t;
                var animations = {
                    "animation"      : "animationend",
                    "OAnimation"     : "oAnimationEnd",
                    "MozAnimation"   : "animationend",
                    "WebkitAnimation": "webkitAnimationEnd"
                };
                for(t in animations){
                    if( el.style[t] !== undefined ){
                        return animations[t];
                    }
                }
            },
            fieldValidation: function(element){
                var validator = false;
                if(typeof element === "string"){
                    validator += ((element.indexOf('#') !== -1)) ? true : false;
                    validator += ((element.indexOf('!') !== -1)) ? true : false;
                    validator += ((element.indexOf('$') !== -1)) ? true : false;
                    validator += ((element.indexOf('%') !== -1)) ? true : false;
                    validator += ((element.indexOf('/') !== -1)) ? true : false;
                    validator += ((element.indexOf('(') !== -1)) ? true : false;
                    validator += ((element.indexOf(')') !== -1)) ? true : false;
                    validator += ((element.indexOf('=') !== -1)) ? true : false;
                    validator += ((element.indexOf('<') !== -1)) ? true : false;
                    validator += ((element.indexOf('>') !== -1)) ? true : false;
                    validator += ((element.indexOf('¡') !== -1)) ? true : false;
                    validator += ((element.indexOf('\'') !== -1)) ? true : false;
                    validator += ((element.indexOf('´') !== -1)) ? true : false;
                    validator += ((element.indexOf('*') !== -1)) ? true : false;
                    validator += ((element.indexOf('[') !== -1)) ? true : false;
                    validator += ((element.indexOf(']') !== -1)) ? true : false;
                    validator += ((element.indexOf('{') !== -1)) ? true : false;
                    validator += ((element.indexOf('}') !== -1)) ? true : false;
                    validator += ((element.indexOf('+') !== -1)) ? true : false;
                    validator += ((element.indexOf('"') !== -1)) ? true : false;
                    validator += ((element.indexOf('|') !== -1)) ? true : false;
                    validator += ((element.indexOf('°') !== -1)) ? true : false;
                    validator += ((element.indexOf('&') !== -1)) ? true : false;
                    if(validator)
                        validator = true;
                    else
                        validator = false;
                }
                return validator;
            }
        },
        created: function(){
            
        },
        mounted: function(){
            this.hidden = false;
            this.$refs.username.autofocus = true;
        }
    })
};
