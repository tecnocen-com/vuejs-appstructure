var verRuta = require("./../rutas/verRuta.js");
module.exports = new Vue({
    data: {
		step: 0,
		models: {
            ruta: null,
            rutaPunto: null,
            rutaPuntoServicio: null,
            sucursal: null,
            sucursalHorario: null,
            sucursalCliente: null,
            proyeccionTrabajo: null
        },
        exporter: {
			plugins: {
                xlsx: require("xlsx")
            }
		},
		filter: {
			randomDate: {
				text: null,
				value: [],
			},
			rangeDate: {
				begin: {
					value: null,
					valid: true
				},
				end: {
					value: null,
					valid: true
				}
			},
			type: false			//False per range, True random
		},
		map: {
            distanceMatrix: null,
            directionService: null
        },
        proyection: [],
		proyectionToExport: [],
        data: {
            perPage: 15,
            page: {
                proyection: {
                    currentPage: 1,
                    pageCount: null,
                    totalCount: null
                }
            }
        },
        see: {
			first: true,
			date: null,
            route: verRuta
		},
    },
    methods: {
        init: function(e){
            if(e){
                this.models.ruta = e.ruta;
				this.models.rutaPunto = e.rutaPunto;
				this.models.rutaPuntoServicio = e.rutaPuntoServicio;
				this.models.sucursal = e.sucursal;
				this.models.sucursalHorario = e.sucursalHorario;
				this.models.sucursalCliente = e.sucursalCliente;
				this.models.proyeccionTrabajo = e.proyeccionTrabajo;
            }
            else{
				this.initInputDate(true);
				this.initServices();
            }
        },
		handleMulti: function(e){
			$( "#random" ).datepicker(e ? "show" : "hide");
		},
		setMulti: function(e){
			var newRandomDate = [],
				i, index = this.filter.randomDate.value.indexOf(e);
			if(index === -1)
				this.filter.randomDate.value.push(e);
			else{
				for(i = 0; i < this.filter.randomDate.value.length; i++)
					if(i !== index)
						newRandomDate.push(this.filter.randomDate.value[i]);
				this.filter.randomDate.value = newRandomDate;
			}
			this.filter.randomDate.text = this.filter.randomDate.value.join(", ");
		},
        initServices: function(){
            this.map.distanceMatrix = new google.maps.DistanceMatrixService();
            this.map.directionService = new google.maps.DirectionsService();
        },
        initInputDate: function(all){
			var me = this;
			if(all)
				this.reset();
			Vue.nextTick(function(){
				setTimeout(function(){
					if(me.filter.type)
						$( "#random" ).multiDatesPicker({
							maxPicks: 30,
							dateFormat: "yy-mm-dd",
							onSelect: function(e){
								me.handleMulti(false);
								me.setMulti(e);
								setTimeout(function(){
									me.handleMulti(true);
								}, 250);
							}
						});
					else{
						$( "#begin" ).datepicker({
							//minDate: "2017-09-20",		//To select only the or after today -> 0 means today
							dateFormat: "yy-mm-dd",
							onSelect: function(e){
								me.filter.rangeDate.begin.value = e;
								me.filter.rangeDate.end.value = null;
								$( "#end" ).datepicker( "option", "minDate", e );
							}
						});
						$( "#end" ).datepicker({
							minDate: me.filter.rangeDate.begin.value,
							dateFormat: "yy-mm-dd",
							onSelect: function(e){
								me.filter.rangeDate.end.value = e;
							}
						});
					}
				}, 100);
			});
		},
		initTemplate: function(e, page){
			var i, params = {},
                me = this;
            if(e === 0){
				this.step = 1;
				if(page)
					this.data.page.proyection.currentPage = page;
            }
			this.proyection = [];
			params["per-page"] = this.data.perPage;
			params.sort = "fecha";
			params.page = this.data.page.proyection.currentPage;
			params.expand = "cliente, empleadoHorario.empleado, punto.ruta, punto.sucursal";
			if(this.filter.type){		//Range
				params.fecha = "";
				for(i = 0; i < this.filter.randomDate.value.length; i++)
					params.fecha += this.filter.randomDate.value[i] + (i === this.filter.randomDate.value.length - 1 ? "" : ", ");
			}
			else{						//Random
				params.fecha_inicio = this.filter.rangeDate.begin.value;
				params.fecha_fin = this.filter.rangeDate.end.value;
			}
			this.models.proyeccionTrabajo.get({
				params: params
			},
			function(success){
				me.data.page.proyection.pageCount = parseInt(success.headers.get("x-pagination-page-count"));
				me.data.page.proyection.totalCount = parseInt(success.headers.get("x-pagination-total-count"));
				console.log(success);
				for(i = 0; i < success.body.length; i++)
					me.initProyection(success.body[i]);
			},
			function(error){
				console.log(error);
			});
		},
		initProyection: function(e){
			this.proyection.push({
				id: e.id,
				resource: {
					//id: e._embedded.empleadoHorario._embedded.empleado.id,
					//name: e._embedded.empleadoHorario._embedded.empleado.nombre,
					//idSchedule: e._embedded.empleadoHorario.id,
					//schedule: e._embedded.empleadoHorario.hora_inicio + " - " + e._embedded.empleadoHorario.hora_fin
				},
				day: {
					date: e.fecha,
					//name: e._embedded.empleadoHorario.nombreDia,
					//id: e._embedded.empleadoHorario.dia
				},
				route: {
					id: e.ruta_id,
					//name: e._embedded.punto._embedded.ruta.nombre,
					//begin: e._embedded.punto._embedded.ruta.hora_inicio,
					//end: e._embedded.punto._embedded.ruta.hora_fin,
				},
				//store: {
				//	id: e._embedded.punto._embedded.sucursal.id,
				//	name: e._embedded.punto._embedded.sucursal.nombre,
				//},
				//client: [],
				linked: false,
				selected: false
			});
        },
		setToExport: function(i){
			var me = this,
				length;
			this.proyection[i].selected = !this.proyection[i].selected;
			if(this.proyection[i].selected){	//Add
				length = me.proyectionToExport.length;
				this.proyectionToExport.push({
					resource: this.proyection[i].resource.name,
					route: {
						name: this.proyection[i].route.name,
						id: this.proyection[i].route.id
					},
					day: {
						date: this.proyection[i].day.date,
						id: this.proyection[i].day.id,
					},
					store: {
						data: {
							totalDistance: null,
							totalTime: this.converter("string", this.converter("time", this.proyection[i].route.end) - this.converter("time", this.proyection[i].route.begin))
						},
						point: []
					}
				});
				this.initPoint(length);
				//me.proyectionToExport({
				//	resource: me.proyection[i].resource.name,
				//	route: me.proyection[i].route.name,
				//	store: me.see.route.store.point[i].name,
				//	client: me.see.route.store.point[j].client[k].name,
				//	start: me.see.route.store.point[j].start,
				//	arrival: me.see.route.store.point[j].arrival,
				//	travel: me.see.route.store.point[j].travel,
				//	death: me.see.route.store.point[j].death,
				//	used: me.see.route.store.point[j].client[k].time
				//});	
				//console.log(me.proyectionToExport);
			}
			else{								//Remove
				console.log("remove", me.see);
			}
		},
		initPoint: function(j){
            var me = this,
				i, length;
			this.models.rutaPunto.get({
                delimiters: this.proyectionToExport[j].route.id,
                params: {
                    "per-page": 100,
                    "sort": "hora_llegada_estimada",
                    "expand": "sucursal"
                }
            },
            function(success){
                for(i = 0; i < success.body.length; i++){
                    length = me.proyectionToExport[j].store.point.length;
                    me.proyectionToExport[j].store.point.push({
                        //id: success.body[i].id,
                        idStore: success.body[i]._embedded.sucursal.id,
                        //lat: success.body[i]._embedded.sucursal.lat,
                        //lng: success.body[i]._embedded.sucursal.lng,
                        name: success.body[i]._embedded.sucursal.nombre,
                        schedule: [],
                        scheduleIndex: null,
                        arrival: success.body[i].hora_llegada_estimada,
                        calculate: true,       //false takes api values, true takes inherit operations
                        travel: length === 0 ? "00:00:00" : null,
                        distance: length === 0 ? 0 : null,
                        start: length === 0 ? me.proyection[j].route.begin : null,
                        death: length === 0 ? me.converter("string", me.converter("time", success.body[i].hora_llegada_estimada) - me.converter("time", me.proyection[j].route.begin)) : null,
                        usedTime: null,
                        client: [],
                        //hidden: true,
                        //renderer: null,
                        //details: {
                        //    warnings: null,
                        //    copyrights: [],
                        //    legs: []
                        //},
                        //main: new google.maps.Marker({
                        //    map: me.map.main,
                        //    position: {
                        //        lat: success.body[i]._embedded.sucursal.lat,
                        //        lng: success.body[i]._embedded.sucursal.lng
                        //    },
                        //    icon: {
                        //        url: "/image/maps/green-empty.png",
                        //        labelOrigin: new google.maps.Point(11, 11)
                        //    },
                        //    label: "" + (length + 1) + "",
                        //    title: success.body[i]._embedded.sucursal.nombre,
                        //}),
                        //window: new google.maps.InfoWindow({
                        //    content: "Dirección no encontrada.",
                        //    maxWidth: 175,
                        //    flag: false
                        //})
                    });
                    me.initClient(success.body[i].id, j, length);
                }
            },
            function(error){
                console.log(error);
            });
        },
        initClient: function(pointId, I, i){
            var j, k, me = this, usedTime = 0;
            this.models.sucursalCliente.get({
                delimiters: this.proyectionToExport[I].store.point[i].idStore,
                params: {
                    "per-page": 100,
                    "expand": "cliente"
                }
            },
            function(success){
                for(j = 0; j < success.body.length; j++){
                    me.proyectionToExport[I].store.point[i].client.push({
                        id: success.body[j]._embedded.cliente.id,
                        name: success.body[j]._embedded.cliente.nombre,
                        time: success.body[j].tiempo_solicitado,
                        active: false
                    });
                }
                me.models.rutaPuntoServicio.get({
                    delimiters: [me.proyectionToExport[I].route.id, pointId],
                    params: {
                        "per-page": 100
                    }
                },
                function(success2){
                    for(j = 0; j < success2.body.length; j++)
                        for(k = 0; k < me.proyectionToExport[I].store.point[i].client.length; k++)
                            if(success2.body[j].cliente_id === me.proyectionToExport[I].store.point[i].client[k].id){
                                me.proyectionToExport[I].store.point[i].client[k].active = true;
                                usedTime += me.converter("time", me.proyectionToExport[I].store.point[i].client[k].time);
                            }
                    me.proyectionToExport[I].store.point[i].usedTime = me.converter("string", usedTime);
                    if(i < me.proyectionToExport[I].store.point.length - 1)
                        me.proyectionToExport[I].store.point[i + 1].start = me.converter("string", usedTime + me.converter("time", me.proyectionToExport[I].store.point[i].arrival));
                    me.initSchedule(I, i);
                },
                function(error2){
                    console.log(error2);
                });
            },
            function(error){
                console.log(error);
            });
        },
        initSchedule: function(I, i){
            var j,
                me = this;
            this.models.sucursalHorario.get({
                delimiters: this.proyectionToExport[I].store.point[i].idStore,
                params: {
                    "per-page": 100,
                    "expand": "cliente",
                    "sort": "hora_inicio"
                }
            },
            function(success){
                for(j = 0; j < success.body.length; j++)
                    if(success.body[j].dia === me.proyectionToExport[I].day.id)
                        me.proyectionToExport[I].store.point[i].schedule.push({
                            begin: success.body[j].hora_inicio,
                            end: success.body[j].hora_fin
                        });
                for(j = 0; j < me.proyectionToExport[I].store.point[i].schedule.length; j++)
                    if(me.proyectionToExport[I].store.point[i].schedule[j].begin <= me.proyectionToExport[I].store.point[i].arrival &&
                       me.proyectionToExport[I].store.point[i].schedule[j].end > me.proyectionToExport[I].store.point[i].arrival)
                        me.proyectionToExport[I].store.point[i].scheduleIndex = j;
                if(me.proyectionToExport[I].store.point[i].schedule[me.proyectionToExport[I].store.point[i].scheduleIndex].begin === me.proyectionToExport[I].store.point[i].arrival)
                    me.proyectionToExport[I].store.point[i].calculate = false;
                if(i > 0)
                    me.initRoute(I, i);
            },
            function(error){
                console.log(error);
            });
        },
        initRoute: function(I, i){
            var me = this,
                j,
                travelTime = 0,
                distance = 0;
            this.map.directionService.route({
                origin: this.proyectionToExport[I].store.point[i - 1].main.position,
                destination: this.proyectionToExport[I].store.point[i].main.position,
                travelMode: "TRANSIT", //this.configuration.service.type, //"DRIVING", //NOTE: Transit not draggable
                avoidTolls: true
            },
            function(response, status){
                if(status === "OK"){
                    //me.proyectionToExport[I].store.point[i - 1].renderer = new google.maps.DirectionsRenderer({
                    //    map: me.map.main,
                    //    draggable: true,
                    //    suppressMarkers: true,
                    //    preserveViewport: true
                    //});
                    //me.proyectionToExport[I].store.point[i - 1].renderer.setDirections(response);
                    //me.proyectionToExport[I].store.point[i - 1].details.copyrights = response.routes[0].copyrights;
                    //me.proyectionToExport[I].store.point[i - 1].details.warnings = [];
                    //for(j = 0; j < response.routes[0].warnings.length; j++)
                    //    me.proyectionToExport[I].store.point[i - 1].details.warnings.push({
                    //        text: response.routes[0].warnings[j]
                    //    });
                    //me.proyectionToExport[I].store.point[i - 1].details.legs.push({
                    //    hidden: false,
                    //    id: me.proyectionToExport[I].store.point[i - 1].details.legs.length,
                    //    end: response.routes[0].legs[0].end_address,
                    //    start: response.routes[0].legs[0].start_address,
                    //    steps: []
                    //});
                    for(j = 0; j < response.routes[0].legs[0].steps.length; j++){
                        //me.proyectionToExport[I].store.point[i - 1].details.legs[0].steps.push({
                        //    distance: {
                        //        value: response.routes[0].legs[0].steps[j].distance.value,
                        //        text: response.routes[0].legs[0].steps[j].distance.text
                        //    },
                        //    duration: {
                        //        value: response.routes[0].legs[0].steps[j].duration.value,
                        //        text: response.routes[0].legs[0].steps[j].duration.text
                        //    },
                        //    instructions: response.routes[0].legs[0].steps[j].instructions,
                        //    travel_mode: response.routes[0].legs[0].steps[j].travel_mode
                        //});
                        travelTime += response.routes[0].legs[0].steps[j].duration.value;
                        distance += response.routes[0].legs[0].steps[j].distance.value;
                    }
                    
                    me.proyectionToExport[I].store.point[i].travel = (me.proyectionToExport[I].store.point[i].calculate) ? me.converter("string", me.converter("time", me.proyectionToExport[I].store.point[i].arrival) - me.converter("time", me.proyectionToExport[I].store.point[i].start)):
                        me.proyectionToExport[I].store.point[i].travel = me.converter("string", travelTime);
                    me.proyectionToExport[I].store.point[i].distance = distance;
                    me.proyectionToExport[I].store.data.totalDistance += distance;
                    me.proyectionToExport[I].store.point[i].death = me.converter("string", me.converter("time", me.proyectionToExport[I].store.point[i].arrival) - me.converter("time", me.proyectionToExport[I].store.point[i].start) - me.converter("time", me.proyectionToExport[I].store.point[i].travel));
					console.log(me.proyectionToExport);
                }
                else
                    console.log(status);
            });
        },
        reset: function(){
			this.filter.randomDate.value = [];
			this.filter.randomDate.text = null;
			this.filter.rangeDate.begin.value = null;
			this.filter.rangeDate.end.value = null;
			this.see.first = true;
			this.step = 0;
		},
		seeRoute: function(i){
			var me = this;
			this.see.route.id = this.proyection[i].route.id;
			this.see.date = this.proyection[i].date;
			Vue.nextTick(function(){
				me.see.route.init("modal", me.see.first);
				if(me.see.first === true)
					me.see.first = false;
			});
		},
        converter: function(type, val){
            var value;
            switch(type){
                case "time":    //val is string, want return as time
                    if(val){
                        val = val.split(":");
                        value = 0;
                        value += parseInt(val[0]) * 3600;
                        value += parseInt(val[1]) * 60;
                        value += parseInt(val[2]);
                    }
                    break;
                case "string":  //val is time, want return as string
                    var hours = Math.floor( val / 3600 );
                    var minutes = Math.floor( val / 60 - (hours * 60) );
                    var seconds = val - (hours * 3600) - (minutes * 60);
                    value = hours < 10 ? '0' + hours : hours;
                    value += ":" + (minutes < 10 ? '0' + minutes : minutes);
                    value += ":" + (seconds < 10 ? '0' + seconds : seconds);
                    break;
            }
            return value;
        }
    }
});