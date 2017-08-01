module.exports = new Vue({
    data: {
        token: null,
        mapsClient: null,
        configuration: {
            map: {
                main: null,
                data: {
                    //center: {
                    //    lat: -24.345,
                    //    lng: 134.46
                    //},
                    zoom: 18
                }
            },
            service: {
                distanceMatrix: null,
                directionService: null,
                directionRenderer: [],
                totalDistance: 0,
                totalTime: 0,
                deathTime: 0,
                type: "TRANSIT",    //NOTE: Transit not draggable
                distance: [],
                travelDetails: {
                    copyrights: null,
                    warnings: [],
                    legs: []
                }
            },
            geocoder: {
                main: null,
                address: "Chilpancingo_1_2, Hipódromo"
            },
            marker: {
                id: 0,
                marks: []
            }
        }
    },
    methods: {
        init: function(){
            this.initMap();
            this.initGeocoder();
            this.initService();
        },
        initMap: function(){
            var me = this;
            this.configuration.map.main = new google.maps.Map(document.getElementById('map'), {     //Define Map
                zoom: this.configuration.map.data.zoom
            });
            this.configuration.map.main.addListener("click", function(e){       //Define on click listener for map
                me.selection(e.latLng);
            });
            
        },
        initGeocoder: function(){
            var me = this;
            this.configuration.geocoder.main = new google.maps.Geocoder();      //Geocoder for fisrt position
            this.configuration.geocoder.main.geocode({                          //Geocoder for placing
                address: this.configuration.geocoder.address
            },
            function(response, status){
                if(status === "OK")
                    me.configuration.map.main.setCenter(response[0].geometry.location);
                else
                    console.log(status);
            });
        },
        initService: function(){
            this.configuration.service.distanceMatrix = new google.maps.DistanceMatrixService();
            this.configuration.service.directionService = new google.maps.DirectionsService();
        },
        initRenderer: function(e){
            var i, me = this;
            if(e){
                this.configuration.service.travelDetails.legs = [];
                for(i = 0; i < this.configuration.service.directionRenderer.length; i++){ 
                    this.configuration.service.directionRenderer[i].main.setMap(null);
                    this.configuration.service.directionRenderer[i].main.setPanel(null);
                    this.configuration.service.directionRenderer[i].main = null;
                    this.configuration.service.directionRenderer[i].main = new google.maps.DirectionsRenderer({
                        draggable: true,
                        suppressMarkers: true,
                        map: this.configuration.map.main,
                        //panel: document.getElementById("toolbar"),
                        markerOptions: {
                            icon: "https://mts.googleapis.com/maps/vt/icon/name=icons/spotlight/spotlight-waypoint-a.png&text=" + (i + 1) + "&psize=16&font=fonts/Roboto-Regular.ttf&color=ff333333&ax=44&ay=48&scale=1"
                        }
                    });
                    (function(I){
                        me.configuration.service.directionRenderer[I].main.addListener("directions_changed", function(){
                            me.computeRoute(me.configuration.service.directionRenderer[I].main.getDirections());
                        });
                    })(i);
                }
            }
            else{
                this.configuration.service.directionRenderer.push({
                    main: new google.maps.DirectionsRenderer({
                        draggable: true,
                        suppressMarkers: true,
                        map: this.configuration.map.main,
                        //panel: document.getElementById("toolbar"),
                        markerOptions: {
                            icon: "https://mts.googleapis.com/maps/vt/icon/name=icons/spotlight/spotlight-waypoint-a.png&text=" + (this.configuration.service.directionRenderer.length + 1) + "&psize=16&font=fonts/Roboto-Regular.ttf&color=ff333333&ax=44&ay=48&scale=1"
                        }
                    })
                });
                this.configuration.service.directionRenderer[this.configuration.service.directionRenderer.length - 1].main.addListener("directions_changed", function(){
                    me.computeRoute(me.configuration.service.directionRenderer[me.configuration.service.directionRenderer.length - 1].main.getDirections());
                });
            }
        },
        setRoute: function(e){
            var i, j,
                waypoints = [],
                me = this;
            switch(this.configuration.service.type){
                case "TRANSIT":
                    if(e){
                        this.initRenderer(true);
                        for (i = 0; i < this.configuration.marker.marks.length; i++){
                            if(i > 0){
                                (function(I){
                                    me.configuration.service.directionService.route({
                                        origin: me.configuration.marker.marks[I - 1].main.position,
                                        destination: me.configuration.marker.marks[I].main.position,
                                        travelMode: me.configuration.service.type, //"DRIVING", //NOTE: Transit not draggable
                                        avoidTolls: true
                                    },
                                    function(response, status){
                                        if(status === "OK"){
                                            me.configuration.service.directionRenderer[I - 1].main.setDirections(response);
                                            me.configuration.service.travelDetails.copyrights = response.routes[0].copyrights;
                                            me.configuration.service.travelDetails.warnings = [];
                                            for(j = 0; j < response.routes[0].warnings.length; j++)
                                                me.configuration.service.travelDetails.warnings.push({
                                                    text: response.routes[0].warnings[j]
                                                });
                                            me.configuration.service.travelDetails.legs.push({
                                                visible: true,
                                                deathTime: 0,
                                                id: I - 1,
                                                end: response.routes[0].legs[0].end_address,
                                                iconEnd: me.configuration.marker.marks[I].main.icon,
                                                start: response.routes[0].legs[0].start_address,
                                                iconStart: me.configuration.marker.marks[I - 1].main.icon,
                                                steps: []
                                            });
                                            for(j = 0; j < response.routes[0].legs[0].steps.length; j++)
                                                me.configuration.service.travelDetails.legs[me.configuration.service.travelDetails.legs.length - 1].steps.push({
                                                    distance: {
                                                        value: response.routes[0].legs[0].steps[j].distance.value,
                                                        text: response.routes[0].legs[0].steps[j].distance.text
                                                    },
                                                    duration: {
                                                        value: response.routes[0].legs[0].steps[j].duration.value,
                                                        text: response.routes[0].legs[0].steps[j].duration.text
                                                    },
                                                    instructions: response.routes[0].legs[0].steps[j].instructions,
                                                    travel_mode: response.routes[0].legs[0].steps[j].travel_mode
                                                });
                                            me.configuration.service.travelDetails.legs.sort(function(a, b){
                                                return a.id > b.id ? 1 :
                                                        a.id < b.id ? -1 : 0;
                                            });
                                        }
                                        else
                                            console.log(status);
                                    });
                                })(i);
                            }
                        }
                    }
                    else{ 
                        this.initRenderer(false);
                        this.configuration.service.directionService.route({
                            origin: this.configuration.marker.marks[this.configuration.marker.marks.length - 2].main.position,
                            destination: this.configuration.marker.marks[this.configuration.marker.marks.length - 1].main.position,
                            travelMode: this.configuration.service.type, //"DRIVING", //NOTE: Transit not draggable
                            avoidTolls: true
                        },
                        function(response, status){
                            if(status === "OK"){
                                me.configuration.service.directionRenderer[me.configuration.service.directionRenderer.length - 1].main.setDirections(response);
                                me.configuration.service.travelDetails.copyrights = response.routes[0].copyrights;
                                me.configuration.service.travelDetails.warnings = [];
                                for(i = 0; i < response.routes[0].warnings.length; i++)
                                    me.configuration.service.travelDetails.warnings.push({
                                        text: response.routes[0].warnings[i]
                                    });
                                me.configuration.service.travelDetails.legs.push({
                                    visible: true,
                                    deathTime: 0,
                                    id: me.configuration.service.travelDetails.legs.length,
                                    end: response.routes[0].legs[0].end_address,
                                    iconEnd: me.configuration.marker.marks[me.configuration.marker.marks.length - 1].main.icon,
                                    start: response.routes[0].legs[0].start_address,
                                    iconStart: me.configuration.marker.marks[me.configuration.marker.marks.length - 2].main.icon,
                                    steps: []
                                });
                                for(i = 0; i < response.routes[0].legs[0].steps.length; i++)
                                    me.configuration.service.travelDetails.legs[me.configuration.service.travelDetails.legs.length - 1].steps.push({
                                        distance: {
                                            value: response.routes[0].legs[0].steps[i].distance.value,
                                            text: response.routes[0].legs[0].steps[i].distance.text
                                        },
                                        duration: {
                                            value: response.routes[0].legs[0].steps[i].duration.value,
                                            text: response.routes[0].legs[0].steps[i].duration.text
                                        },
                                        instructions: response.routes[0].legs[0].steps[i].instructions,
                                        travel_mode: response.routes[0].legs[0].steps[i].travel_mode
                                    });
                            }
                            else
                                console.log(status);
                        });
                    }
                    break;
                case "DRIVING":
                    if(this.configuration.service.directionRenderer.length === 0)
                        this.initRenderer(false);
                    for (i = 0; i < this.configuration.marker.marks.length; i++)
                        if(i !== 0 && i !== this.configuration.marker.marks.length - 1)
                            waypoints.push({
                                location: this.configuration.marker.marks[i].main.position
                            });
                    this.configuration.service.directionService.route({
                        origin: this.configuration.marker.marks[0].main.position,
                        destination: this.configuration.marker.marks[this.configuration.marker.marks.length-1].main.position,
                        waypoints: waypoints,
                        travelMode: this.configuration.service.type,
                        avoidTolls: true
                    },
                    function(response, status){
                        if(status === "OK")
                            me.configuration.service.directionRenderer[0].main.setDirections(response);
                        else
                            console.log(status);
                    });
                    break;
            }
        },
        computeRoute: function(result){
            var i;
            if(result){   
                var myroute = result.routes[0];
                for (i = 0; i < myroute.legs.length; i++){
                  this.configuration.service.totalDistance += myroute.legs[i].distance.value;
                  this.configuration.service.totalTime += myroute.legs[i].duration.value;
                }
            }
            else{
                this.configuration.service.deathTime = 0;
                for(i = 0; i < this.configuration.service.travelDetails.legs.length; i++)
                    if(!isNaN(parseInt(this.configuration.service.travelDetails.legs[i].deathTime)))
                        this.configuration.service.deathTime += parseInt(this.configuration.service.travelDetails.legs[i].deathTime);
            }
        },
        selection: function(pos){
            this.configuration.marker.marks.push({
                main: new google.maps.Marker({
                    map: this.configuration.map.main,
                    position: pos,
                    icon: "https://mts.googleapis.com/maps/vt/icon/name=icons/spotlight/spotlight-waypoint-a.png&text=" + (this.configuration.marker.marks.length + 1) + "&psize=16&font=fonts/Roboto-Regular.ttf&color=ff333333&ax=44&ay=48&scale=1"
                }),
                id: this.configuration.marker.id,
            });
            this.deletion(this.configuration.marker.id++);
            this.configuration.map.main.panTo(pos);
            if(this.configuration.marker.marks.length > 1){
                this.setRoute(false);
                this.router(false);
            }
        },
        deletion: function(iM){
            var me = this,
                i, j = 0,
                newMark = null;
            this.configuration.marker.marks[this.configuration.marker.marks.length - 1].main.addListener("dblclick", function(){
                newMark = [];
                for(i = 0; i < me.configuration.marker.marks.length; i++){
                    if(me.configuration.marker.marks[i].id !== iM){
                        me.configuration.marker.marks[i].main.setIcon("https://mts.googleapis.com/maps/vt/icon/name=icons/spotlight/spotlight-waypoint-a.png&text=" + (++j) + "&psize=16&font=fonts/Roboto-Regular.ttf&color=ff333333&ax=44&ay=48&scale=1");
                        newMark.push(me.configuration.marker.marks[i]);
                    }
                    else
                        me.configuration.marker.marks[i].main.setMap(null);
                }
                me.configuration.marker.marks = newMark;
                me.configuration.service.totalDistance = 0;
                me.configuration.service.totalTime = 0;
                if(me.configuration.marker.marks.length > 1){
                    me.setRoute(true);
                    me.router(true);
                }
                else{
                    me.initRenderer(true);
                }
            });
        },
        router: function(all){
            var i,
                markLength = this.configuration.marker.marks.length,
                me = this;
            if(all){
                me.configuration.service.distance = [];
                for(i = 0; i < markLength; i++)
                    if(i > 0)
                        this.configuration.service.distanceMatrix.getDistanceMatrix({
                            origins: [
                                new google.maps.LatLng(this.configuration.marker.marks[i - 1].main.position.lat(),
                                    this.configuration.marker.marks[i - 1].main.position.lng())
                            ],
                            destinations: [
                                new google.maps.LatLng(this.configuration.marker.marks[i].main.position.lat(),
                                    this.configuration.marker.marks[i].main.position.lng())
                            ],
                            travelMode: this.configuration.service.type
                        },
                        function(response, status){
                            if(status === "OK")
                                me.configuration.service.distance.push({
                                    origin: response.originAddresses[0],
                                    destiny: response.destinationAddresses[0],
                                    distance: response.rows[0].elements[0].distance.text,
                                    time: response.rows[0].elements[0].duration.text
                                });
                            else
                                console.log(status);
                        });
            }
            else
                this.configuration.service.distanceMatrix.getDistanceMatrix({
                    origins: [
                        new google.maps.LatLng(this.configuration.marker.marks[this.configuration.marker.marks.length - 2].main.position.lat(),
                            this.configuration.marker.marks[this.configuration.marker.marks.length - 2].main.position.lng())
                    ],
                    destinations: [
                        new google.maps.LatLng(this.configuration.marker.marks[this.configuration.marker.marks.length - 1].main.position.lat(),
                            this.configuration.marker.marks[this.configuration.marker.marks.length - 1].main.position.lng())
                    ],
                    travelMode: this.configuration.service.type
                },
                function(response, status){
                    if(status === "OK")
                        me.configuration.service.distance.push({
                            origin: response.originAddresses[0],
                            destiny: response.destinationAddresses[0],
                            distance: response.rows[0].elements[0].distance.text,
                            time: response.rows[0].elements[0].duration.text
                        });
                    else
                        console.log(status);
                });
        }
    }
});