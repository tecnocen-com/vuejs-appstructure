Control de Cambios de AYP
================================================================================
0.2.0 2017-10-02
--------------------------------------------------------------------------------
- [Enh] `client\js\component\clientes\importadorClientes`, 
`client/js/template/clientes/importadorClientesT.js`,
`client/file/clientes/importador-clientes.xlsx`, importación de nuevos
clientes mediante archivo externo (Marcos-Onca)
- [Enh] `client\js\component\tiendas\nuevaTienda`,
`client/js/template/tiendas/nuevaTiendaT.js`,
`client/file/tiendas/importador-tiendas.xlsx`, importación de nuevas tiendas
mediante archivo externo (Marcos-Onca)
- [Enh] `client\js\component\recursos_humanos\nuevoRecurso`,
`client/js/template/recursos_humanos/nuevoRecursoT.js`,
`client/file/recursos_humanos/importador-recursos-humanos.xlsx`, importación de
nuevos recursos mediante archivo externo (Marcos-Onca)
- [Enh] `client\js\component\reportes\reportes`,
`client/js/template/reportes/reportesT.js`, exportación de datos (Marcos-Onca)
- [Bug] `client\js\component\tiendas\nuevaTienda`,
`client\js\component\tiendas\nuevoRecurso`,
`client\js\component\tiendas\nuevaRuta`, mejora en limpiado de formularios al
agregar nuevos registros - TFD-86 (Marcos-Onca)
- [Bug] `client/js/clientes/tiendasLigadasT.js`,
`client/js/clientes/recursosLigadosT.js`, solución de incompatibilidad de ligado
masivo en navegador mozilla firefox - TFD-87 (Marcos-Onca)
- [Bug] `client\js\component\tiendas\nuevaTienda`,
`client\js\component\tiendas\nuevoRecurso`,
`client\js\component\tiendas\nuevaRuta`, corrección de error de presionado
iterado al agregar registro - TFD-102 (Marcos-Onca)

0.1.0 2017-09-21
--------------------------------------------------------------------------------
- [Enh] `index.js`, principal para iniciar proceso de aplicación con nodeJS
(Marcos-Onca)
- [Enh] `requestHandlers.js`, posee los métodos a realizar para cada URL de
petición del consumidor (Marcos-Onca)
- [Enh] `webpack.config.js`, posee la configuración necesaria para que el módulo
webpack pueda construir el archivo .js general del proyecto (Marcos-Onca)
- [Enh] `package-lock.json`, autogenerado por npm (Marcos-Onca)
- [Enh] `package.json`, posee la configuración necesaria para llevar a cabo el
proceso de npm (Marcos-Onca)
- [Enh] `README.md`, contiene la información relevante de la aplicación
(Marcos-Onca)
- [Enh] `build/login.bundle.js`, generado por el módulo webpack para un ambiente
de desarrollo, usado por la página de ingreso (Marcos-Onca)
- [Enh] `build/main.bundle.js`, generado por el módulo webpack para un ambiente
de desarrollo, usado por la página principal (Marcos-Onca)
- [Enh] `build/login.min.js`, generado por el módulo webpack para un ambiente de
producción, usado por la página de ingreso (Marcos-Onca)
- [Enh] `build/main.min.js`, generado por el módulo webpack para un ambiente de
producción, usado por la página principal (Marcos-Onca)
- [Enh] `client\js\component\clientes\clientesRegistrados`,
`client/js/template/clientes/clientesRegistradosT.js`, obtención y muestreo
general de clientes registrados (Marcos-Onca)
- [Enh] `client\js\component\clientes\recursosLigados`,
`client/js/template/clientes/recursosLigadosT.js`, relación entre clientes y
recursos (Marcos-Onca)
- [Enh] `client\js\component\clientes\tiendasLigadas`,
`client/js/template/clientes/tiendasLigadasT.js`, relación entre clientes y
tiendas (Marcos-Onca)
- [Enh] `client\js\component\recursos_humanos\editarRecurso`,
`client/js/template/recursos_humanos/editarRecursoT.js`, edición de recurso
(Marcos-Onca)
- [Enh] `client\js\component\recursos_humanos\nuevoRecurso`,
`client/js/template/recursos_humanos/nuevoRecursoT.js`, agregado de nuevo recurso
 (Marcos-Onca)
- [Enh] `client\js\component\recursos_humanos\recursosRegistrados`,
`client/js/template/recursos_humanos/recursosRegistradosT.js`, obtención y
muestreo general de recursos registrados (Marcos-Onca)
- [Enh] `client\js\component\recursos_humanos\rutas`,
`client/js/template/recursos_humanos/rutasT.js`, relación entre horarios de
recursos y rutas (Marcos-Onca)
- [Enh] `client\js\component\recursos_humanos\verRecurso`,
`client/js/template/recursos_humanos/verRecursoT.js`, visualización de recurso
(Marcos-Onca)
- [Enh] `client\js\component\rutas\editarRuta`,
`client/js/template/rutas/editarRutaT.js`, edición de ruta (Marcos-Onca)
- [Enh] `client\js\component\rutas\nuevaRuta`,
`client/js/template/rutas/nuevaRutaT.js`, agregado de nueva ruta (Marcos-Onca)
- [Enh] `client\js\component\rutas\rutasRegistradas`,
`client/js/template/rutas/rutasRegistradasT.js`, obtención y muestreo de
general de rutas registradas (Marcos-Onca)
- [Enh] `client\js\component\rutas\verRuta`,
`client/js/template/rutas/verRutaT.js`, visualización de ruta (Marcos-Onca)
- [Enh] `client\js\component\tiendas\editarTienda`,
`client/js/template/tiendas/editarTiendaT.js`, edición de tienda (Marcos-Onca)
- [Enh] `client\js\component\tiendas\nuevaTienda`,
`client/js/template/tiendas/nuevaTiendaT.js`, agregado de nueva tienda
(Marcos-Onca)
- [Enh] `client\js\component\tiendas\tiendasRegistradas`,
`client/js/template/tiendas/tiendasRegistradasT.js`, obtención y muestreo general
de tiendas registradas (Marcos-Onca)
- [Enh] `client\js\component\tiendas\verTienda`,
`client/js/template/tiendas/verTiendaT.js`, visualización de tienda (Marcos-Onca)
- [Enh] `client\js\plugins\modelAR`, librería para ejecución de peticiones HTTP
(Marcos-Onca)
- [Enh] `client\js\plugins\vue-mcdatatable`, librería para tablas de datos
(Marcos-Onca)
- [Enh] `client\js\login`, `client/js/loginT.js`, `client/index.html`, página
de ingreso de la aplicación (Marcos-Onca)
- [Enh] `client\js\main`, `client/js/mainT.js`, `client/home.html`, conjunto de
páginas que conforman la aplicación una vez ingresa un usuario (Marcos-Onca)
- [Enh] `client\js\component\common\dashboard`,
`client/js/template/common/dashboardT.js`, página de inicio (Marcos-Onca)
- [Enh] `client\js\component\common\menu`, `client/js/template/common/menuT.js`,
menú principal (Marcos-Onca)
- [Enh] `client/js/template/common/alertT.js`, alertas (Marcos-Onca)
- [Enh] `client/js/template/common/confirmT.js`, confirmaciones (Marcos-Onca)
- [Enh] `client/js/template/common/footerT.js`, pie de página (Marcos-Onca)
- [Enh] `client/js/template/common/headerT.js`, cabecera general (Marcos-Onca)
- [Enh] `client/js/template/common/loaderT.js`, ícono de carga (Marcos-Onca)
- [Enh] `client/js/template/common/pageHeaderT.js`, cabecera por página
(Marcos-Onca)