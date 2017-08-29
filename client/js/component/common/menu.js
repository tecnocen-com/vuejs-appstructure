module.exports = new Vue({
    data: {
        menu: [
            {
                title: "Inicio",
                icon: "icon-display4",
                dropdown: []
            },
            {
                title: "Clientes",
                icon: "icon-users4",
                dropdown: [
                    {
                        title: "General",
                        subs: [
                            {
                                title: "Clientes registrados",
                                icon: "icon-users"
                            }
                        ]
                    }
                ]
            },
            {
                title: "Tiendas",
                icon: "icon-store",
                dropdown: [
                    {
                        title: "General",
                        subs: [
                            {
                                title: "Tiendas registradas",
                                icon: "icon-location4"
                            },
                            {
                                title: "Nueva tienda",
                                icon: "icon-pen-plus"
                            }
                        ]
                    }
                ]
            },
            {
                title: "Recursos humanos",
                icon: "icon-user-tie",
                dropdown: [
                    {
                        title: "General",
                        subs: [
                            {
                                title: "Recursos registrados",
                                icon: "icon-collaboration"
                            },
                            {
                                title: "Nuevo recurso",
                                icon: "icon-accessibility"
                            }
                        ]
                    }
                ]
            },
            {
                title: "Rutas",
                icon: "icon-direction",
                dropdown: [
                    {
                        title: "General",
                        subs: [
                            {
                                title: "Rutas registradas",
                                icon: "icon-location4"
                            },
                            {
                                title: "Nueva ruta",
                                icon: "icon-compass4"
                            }
                        ]
                    }
                ]
            },
            {
                title: "Reportes",
                icon: "icon-drawer3",
                dropdown: []
            }
        ]
    },
    methods: {
        
    }
});