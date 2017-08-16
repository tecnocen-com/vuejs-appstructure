BUTO.requires = {
    modules: {
        modelAR: require("./plugins/modelAR.js"),
        mcdatatable: require("./plugins/vue-mcdatatable.js").component,
        mapsClient: require("@google/maps")
    },
    templates: {
        main: require("./mainT.js")
    },
    components: {
        toolbar: require("./component/toolbar.js"),
        map: require("./component/map.js"),
        menu: require("./component/common/menu.js"),
        clientesRegistrados: require("./component/clientes/clientesRegistrados.js"),
        tiendasRegistradas: require("./component/tiendas/tiendasRegistradas.js"),
        nuevaTienda: require("./component/tiendas/nuevaTienda.js"),
        recursosRegistrados: require("./component/recursos_humanos/recursosRegistrados.js")
    }
};

Vue.http.get("/init-user-data").then(function(userResponse){
    if(userResponse.status === 200 && userResponse.body.success){
        (function(){
            new BUTO.requires.modules.modelAR({
                baseURL: userResponse.body.baseURL,
                dataURL: userResponse.body.dataURL,
                token: userResponse.body.access_token
                
                //baseURL: "https://alquimia3.adelantoad.com/index.php/api/",
                //tokenURL: "oauth2/token",
                //dataURL: "v1/",
                //contentType: "application/x-www-form-urlencoded",
                //accessData: {
                //    headers: {
                //        Authorization: "Basic dGVzdGNsaWVudDp0ZXN0cGFzcw==",   //username: testclient || password: testpass
                //    },
                //    body: {
                //        grant_type:"password", 
                //        username:"administrador", 
                //        password:"acceso_7h8j9k0l!!"
                //    }
                //}
            },
            function(modelCreator){
                BUTO.components = {
                    main: new Vue({
                        el: "#main",
                        template: BUTO.requires.templates.main,
                        data: {
                            active: {
                                first: 0,
                                second: 0,
                                third: 0
                            },
                            loader: new Vue({
                                data: {
                                    active: false,
                                    message: "Cargando"
                                },
                                methods: {
                                    loading(){
                                        this.active = true;
                                    },
                                    loaded(){
                                        this.active = false;
                                    }
                                }
                            }),
                            confirm: new Vue({
                                data: {
                                    description: {
                                        title: "",
                                        text: "",
                                        accept: "",
                                        cancel: ""
                                    },
                                    active: false
                                },
                                methods: {
                                    onAccept: function(){}
                                }
                            }),
                            alert: new Vue({
                                data: {
                                    description: {
                                        title: "",
                                        text: "",
                                        ok: ""
                                    },
                                    active: false
                                }
                            }),
                            models: {
                                cliente: new modelCreator("cliente"),
                                clienteEmpleado: new modelCreator(["cliente", "empleado"]),
                                clienteSucursal: new modelCreator(["cliente", "sucursal"]),
                                empleado: new modelCreator("empleado"),
                                empleadoCliente: new modelCreator(["empleado", "cliente"]),
                                empleadoHorario: new modelCreator(["empleado", "horario"]),
                                empleadoHorarioRuta: new modelCreator(["empleado", "horario", "ruta"]),
                                empleadoHorarioRutaPunto: new modelCreator(["empleado", "horario", "ruta", "punto"]),
                                sucursal: new modelCreator("sucursal"),
                                sucursalCliente: new modelCreator(["sucursal", "cliente"]),
                                sucursalHorario: new modelCreator(["sucursal", "horario"]),
                                perfil: new modelCreator("perfil"),
                                usuario: new modelCreator("usuario")
                            },
                            children: {
                                map: BUTO.requires.components.map,
                                toolbar: BUTO.requires.components.toolbar,
                                menu: BUTO.requires.components.menu,
                                clientesRegistrados: BUTO.requires.components.clientesRegistrados,
                                tiendasRegistradas: BUTO.requires.components.tiendasRegistradas,
                                nuevaTienda: BUTO.requires.components.nuevaTienda,
                                recursosRegistrados: BUTO.requires.components.recursosRegistrados
                            }
                        },
                        methods: {
                            setView: function(e){
                                var me = this,
                                    inPos = false;
                                if(this.active.first === e.first &&
                                   this.active.second === e.second &&
                                   this.active.third === e.third)
                                    inPos = true;
                                else{
                                    this.active.first = e.first;
                                    this.active.second = e.second;
                                    this.active.third = e.third;
                                }
                                if(!inPos)
                                    Vue.nextTick(function(){
                                        if(e.first === 0 && e.second === 0 && e.third === 0)
                                            me.children.map.init();
                                        else if(e.first === 2 && e.second === 0 && e.third === 1)
                                            me.children.nuevaTienda.init(false);
                                    });
                            },
                            mask: function(t, e, val){
                                var value,
                                    i;
                                if(e.key !== "Backspace"){
                                    switch(t){
                                        case "time":
                                            if(val.length >= 2){
                                                value = val.split(":").join("");
                                                val = "";
                                                for(i = 0; i < value.length; i++)
                                                    val += (!isNaN(parseInt(value[i]))) ? value[i] : "";
                                                value = val;
                                                val = "";
                                                for(i = 0; i < value.length; i++)
                                                    val += (i === 1 || i === 3) ? value[i] + ":" : value[i];
                                            }
                                            break;
                                        case "date":
                                            
                                            break;
                                    }
                                }
                                return val;
                            }
                        },
                        created: function(){
                            BUTO.init(userResponse);
                            BUTO.requires.components.clientesRegistrados.init({
                                cliente: this.models.cliente
                            });
                            BUTO.requires.components.tiendasRegistradas.init({
                                sucursal: this.models.sucursal
                            });
                            BUTO.requires.components.nuevaTienda.init({
                                sucursal: this.models.sucursal,
                                sucursalHorario: this.models.sucursalHorario
                            });
                            BUTO.requires.components.recursosRegistrados.init({
                                empleado: this.models.empleado
                            });
                        },
                        mounted: function(){
                            //this.children.map.init();
                        }
                    })
                };
            },
            function(error){
                console.log(error);
            });
        })();
    }
    else{
        window.location = "/logout";
    }
});
BUTO.init = function(response){
    BUTO.requires.components.map.token = response.body.apiKey;
    BUTO.requires.components.map.mapsClient = BUTO.requires.modules.mapsClient.createClient({
        key: response.body.apiKey
    });
};