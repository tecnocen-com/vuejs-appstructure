module.exports = new Vue({
    data: {
        models: {
            cliente: null
        },
        plugins: {
            xlsx: require("xlsx")
        },
        file: {
            value: null,
            text: "No has seleccionado ningún archivo"
        },
        client: [],
        total: 0,
        valid: true,
        variant: {
            nameIndex: null,
            name: [
                {
                    id: "Nombre"
                },
                {
                    id: "nombre"
                },
                {
                    id: "NOMBRE"
                }
            ]
        }
    },
    methods: {
        init: function(e){
            if(e)
                this.models.cliente = e.cliente;
            else{
                Vue.nextTick(function(){
                    $('.input-info').popover();
                });
            }
        },
        changeFile: function(e){
            this.file.text = "No has seleccionado ningún archivo";
            this.file.value = null;
            if(e.target.files.length > 0 &&
            (e.target.files[0].type === "application/vnd.oasis.opendocument.spreadsheet" ||
            e.target.files[0].type === "application/vnd.oasis.opendocument.spreadsheet-template" ||
            e.target.files[0].type === "application/vnd.ms-excel" ||
            e.target.files[0].type === "application/vnd.ms-excel.sheet.macroEnabled.12" ||
            e.target.files[0].type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")){
                this.file.text = e.target.files[0].name;
                this.file.value = e.target.files[0];
            }
            else if(e.target.files.length > 0){
                BUTO.components.main.alert.description.title = "Errores en importación de datos";
                BUTO.components.main.alert.description.text = "Tipo de archivo inválido.<br>Las extensiones válidas para importar clientes son .xls, .xlsx, .xlsm, .ods y .ots.<br>Inténtalo de nuevo.";
                BUTO.components.main.alert.description.ok = "Aceptar";
                BUTO.components.main.alert.active = true;
            }
        },
        validation: function(i){
            this.client[i].valid = false;
            if(this.client[i].value === undefined ||
               this.client[i].value === null ||
               this.client[i].value === "")
                this.client[i].text = "Nombre no puede estar vacío";
            else if(this.client[i].value.length < 4)
                this.client[i].text = "Nombre debe contener al menos 4 caracteres";
            else{
                this.client[i].text = "";
                this.client[i].valid = true;
            }
        },
        process: function(){
            var me = this,
                i, length, workbook, data,
                reader = new FileReader();
            this.client = [];
            this.variant.nameIndex = null;
            BUTO.components.main.loader.active = true;
            reader.onload = function(e){
                workbook = me.plugins.xlsx.read(e.target.result, {type: "binary"});
                data = me.plugins.xlsx.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], {raw: true});
                length = data.length;
                if(length > 0){
                    for(i = 0; i < me.variant.name.length; i++)
                        if(data[0].hasOwnProperty(me.variant.name[i].id))
                            me.variant.nameIndex = i;
                    if(me.variant.nameIndex !== null){
                        for(i = 0; i < length; i++){
                            me.client.push({
                                value: data[i][me.variant.name[me.variant.nameIndex].id],
                                text: "",
                                valid: false
                            });
                            me.validation(i);
                        }
                    }
                    else{
                        BUTO.components.main.alert.description.title = "Errores en importación de datos";
                        BUTO.components.main.alert.description.text = "No se pudo identificar una columna apropiada para obtener los nombres de los clientes.";
                        BUTO.components.main.alert.description.ok = "Aceptar";
                        BUTO.components.main.alert.active = true;
                    }
                    BUTO.components.main.loader.active = false;
                }
                else{
                    BUTO.components.main.alert.description.title = "Errores en importación de datos";
                    BUTO.components.main.alert.description.text = "No se pudieron identificar datos en este archivo.";
                    BUTO.components.main.alert.description.ok = "Aceptar";
                    BUTO.components.main.alert.active = true;
                    BUTO.components.main.loader.active = false;
                }
            };
            reader.readAsBinaryString(this.file.value);

            //var data = new FormData();
            //data.append("file", this.file.value);
            //data.append("type", "client");
            //Vue.http.post("/upload-import", data, {
            //    headers: {
            //        'Content-Type': 'multipart/form-data'
            //    }
            //}).then(function(userResponse){
            //    
            //});
        },
        remove: function(i){
            var j, newClient = [], length = this.client.length;
            for(j = 0; j < length; j++)
                if(j !== i)
                    newClient.push(this.client[j]);
            this.client = newClient;
        },
        submit: function(){
            var i,
                length = this.client.length,
                total = 0;
            BUTO.components.main.loader.active = true;
            for(i = 0; i < length; i++)
                total += i;
            for(i = 0; i < length; i++)
                this.submitClient(i, total);
        },
        submitClient: function(i, total){
            var me = this;
            this.models.cliente.post({
                params: {
                    nombre: this.client[i].value
                }
            },
            function(success){
                me.total += i;
                if(me.total === total)
                    setTimeout(function(){
                        me.reset("step");
                    }, 100);
            },
            function(error){
                console.log(error);
                me.total += i;
                me.valid = false;
                me.client[i].valid = false;
                me.client[i].text = error.body[0].message;
                if(me.total === total)
                    setTimeout(function(){
                        me.reset("step");
                    }, 100);
            });
        },
        reset: function(type){
            var length = this.client.length,
                j, newClient = [];
            switch(type){
                case "all":
                    this.client = newClient;
                    this.total = 0;
                    this.valid = true;
                    break;
                case "step":
                    for(j = 0; j < length; j++){
                        if(!this.client[j].valid){
                            this.valid = false;
                            newClient.push(this.client[j]);
                        }
                    }
                    this.client = newClient;
                    this.total = 0;
                    if(this.valid){
                        BUTO.components.main.alert.description.title = "Importación de datos completada";
                        BUTO.components.main.alert.description.text = "Los registros ya han sido agregados.";
                    }
                    else{
                        BUTO.components.main.alert.description.title = "Errores en importación de datos";
                        BUTO.components.main.alert.description.text = "Existen algunos errores en los datos obtenidos. Inténtalo de nuevo.<br>NOTA: Los registros correctamente definidos ya han sido agregados.";
                    }
                    BUTO.components.main.alert.description.ok = "Aceptar";
                    BUTO.components.main.alert.active = true;
                    this.valid = true;
                    BUTO.components.main.children.clientesRegistrados.grid.updatePagination();
                    BUTO.components.main.loader.active = false;
                    break;
            }
        }
    }
});