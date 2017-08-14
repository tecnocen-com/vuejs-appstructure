module.exports = new Vue({
    data: {
        typeSelection: {
            type: null,
            options: [
                {
                    value: 0,
                    text: "Importación de datos"
                },
                {
                    value: 1,
                    text: "Agregado manual"
                }
            ]
        },
        manualAdd: {
            active: {
                mon: true,
                tue: true,
                wed: true,
                thu: true,
                fry: true,
                sat: true,
                sun: false
            }
        }
    },
    methods: {
        
    }
});