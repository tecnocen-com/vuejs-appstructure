var verRuta = require("./../rutas/verRuta.js");
module.exports = new Vue({
    data: {
		step: 0,
		models: {
            ruta: null,
            rutaPunto: null,
            rutaPuntoServicio: null,
            proyeccionServicio: null
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
            route: verRuta
		},
    },
    methods: {
        init: function(e){
            if(e){
                this.models.ruta = e.ruta;
				this.models.rutaPunto = e.rutaPunto;
				this.models.rutaPuntoServicio = e.rutaPuntoServicio;
				this.models.proyeccionServicio = e.proyeccionServicio;
            }
            else
				this.initInputDate(true);
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
				//this.see.first = true;
            }
			this.proyection = [];
			params["per-page"] = this.data.perPage;
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
			this.models.proyeccionServicio.get({
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
			var i,
				j = null,
				length = this.proyection.length;
			for(i = 0; i < length; i++)
				if(this.proyection[i].id === e.proyeccion_id)
					j = i;
			if(j === null){
				j = length;
				this.proyection.push({
					id: e.proyeccion_id,
					employee: {
						id: e._embedded.empleadoHorario._embedded.empleado.id,
						name: e._embedded.empleadoHorario._embedded.empleado.name,
						idSchedule: e._embedded.empleadoHorario.id,
						schedule: e._embedded.empleadoHorario.hora_inicio + " - " + e._embedded.empleadoHorario.hora_fin
					},
					date: e.fecha,
					day: e._embedded.empleadoHorario.nombreDia,
					route: {
						id: e._embedded.punto._embedded.ruta.id,
						name: e._embedded.punto._embedded.ruta.nombre,
					},
					store: {
						id: e._embedded.punto._embedded.sucursal.id,
						name: e._embedded.punto._embedded.sucursal.nombre,
					},
					client: [],
					linked: false,
					selected: false
				});
			}
			this.proyection[j].client.push({
				
			});
        },
		reset: function(){
			this.filter.randomDate.value = [];
			this.filter.randomDate.text = null;
			this.filter.rangeDate.begin.value = null;
			this.filter.rangeDate.end.value = null;
			this.step = 0;
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