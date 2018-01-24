vuejs-appstructure
============
## Traducciones
* [Inglés]
* [Español]

## Comenzando
Clonar el repositorio en un directorio local.
Ver la sección «despliege» (deployment) para notas de como correrlo en un ambiente productivo.

### Pre-requisitos
- Node.js 8+ (LTS)
Instalación de nodeJS:
```bash
$ sudo apt-get update
$ sudo apt-get install nodejs
```

- Npm 3.10+
Instalación de npm:
```bash
$ sudo apt-get install npm
$ npm -v
```

Si la versión de npm es menor a la recomendada, proceder con:
```bash
$ sudo npm install npm@latest -g
```

Si la versión de nodeJS es menor a la recomendada, proceder con:
```bash
$ sudo npm cache clean -f
$ sudo npm install -g n
$ sudo n stable
```

NOTA: Particularmente en ubuntu el binario para nodeJS es "nodejs" en vez de "node" debido a otro paquete. 
Si se requiere llamarlo como "node" se procederá con:
```bash
$ sudo ln -sf /usr/local/n/versions/node/<VERSION>/bin/node /usr/bin/nodejs
```
En donde ```<VERSION>``` es la última versión instalada.

### Instalación de proyecto
####Clonar el repositorio:
```bash
$ git clone https://github.com/tecnocen-com/vuejs-appstructure.git
```

####Entrar en el proyecto:
```bash
$ cd vuejs-appstructure
```

####Editar las condiciones iniciales del proyecto a desarrollar:
* **```requestHandlers.js```:** En este archivo se definirán las condiciones de acceso al servicio.
```bash
...
4 |     baseURL: "http://34.239.10.155/index.php/api",
5 |     dataURL: "/v1/",
6 |     tokenURL: "/oauth2/token"
...
```
La línea 4 ```baseURL``` se refiere a la raíz del servicio a consumir, sustituir su valor con la URL apropiada.
La línea 5 ```dataURL``` se refiere al acceso a la información del servicio, sustituir su valor con la URL apropiada.
La línea 6 ```tokenURL``` se refiere a accesso a la autenticación del servicio, sustituir su valor con la URL apropiada.

* **```package.json```:** En este archivo se definirán otros datos relacionados con el proyecto.
```bash
...
2 |   "name": "vuejs-appstructure",
3 |   "version": "0.1.0",
4 |   "description": "Structure for web applications based on vueJS framework",
...
10 |   "keywords": [
11 |     "vueJS"
12 |   ],
13 |   "author": "Marcos Jesús Chávez Vega",
14 |   "license": "ISC",
...
```
La línea 2 ```"name"``` se refiere al nombre del proyecto, sustituir su valor con el nombre del proyecto (sin espacios y únicamente en minúsculas).
La línea 3 ```"version"``` se refiere a la versión del proyecto, sustituir con la versión apropiada.
La línea 4 ```"description"``` se refiere a la descripción del proyecto, sustituir su valor con la descripción apropiada.
La línea 10, 11 y 12 ```"keywords"``` se refiere a las palabras clave del proyecto, agregar las palabras clave apropiadas.
La línea 13 ```"author"``` se refiere al desarrollador del proyecto, sustituir con el nombre apropiado.
La línea 14 ```"license"``` se refiere a la licencia del proyecto, sustituir con el valor apropiado.

* **```CHANGELOG.md```:** En este archivo se definirán las funcionalidades del proyecto, para más información leer los [estándares de arquitectura] de tecnocen, en la sección [control de cambios].
```bash
...
1 | vuejs-appstructure
...
```
La línea 1 se refiere al nombre del proyecto, sustituir su valor con el nombre del proyecto.

* **```README.md```:** En este archivo se definirán las características de instalación, uso y definición del proyecto.
```bash
...
1 | vuejs-appstructure
...
57 | $ git clone https://github.com/tecnocen-com/vuejs-appstructure.git
...
63 | $ cd vuejs-appstructure
...
```
La línea 1 se refiere al nombre del proyecto, sustituir su valor con el nombre del proyecto.
La línea 57 se refiere a la URL para poder clonar el proyecto, sustituir con el valor apropiado.
La línea 63 se refiere a la carpeta creada al clonar el proyecto, sustituir con el valor apropiado.

Con respecto a la demás descripción en este archivo, modificar a conveniencia.

####Instalar dependencias npm:
```bash
$ npm install
```

##Estructura del proyecto
* ```build```: dentro de esta carpeta se generarán los archivos core a partir del módulo webpack.
* ```client```: dentro de esta carpeta existen todos los archivos involucrados al proyecto del lado del cliente.
    * ```assets```: dentro de esta carpeta se guardarán todos los archivos involucrados con algún template predefinido, en caso de usarse.
    * ```file```: dentro de esta carpeta se guardarán todos los archivos involucrados en los procesos del proyecto (PDF, XLSX, etc...).
    * ```image```: dentro de esta carpeta se guardarán todas las imagenes involucradas en los procesos.
    * ```js```: dentro de esta carpeta existen todos los archivos JS relacionados con el proyecto.
        * ```component```: dentro de esta carpeta existen todos los archivos JS responsables de crear componentes para el proyecto, fragmentados en carpetas con nombres de cada vista.
            * ```common```: dentro de esta carpeta existen todos los archivos JS que generan componentes que se interrelacionan durante todas las vistas.
        * ```plugins```: dentro de esta carpeta existen todos los archivos JS generados como plugins para ejecutar acciones propias dentro del proyecto y en conexión con los servicios.
        * ```template```: dentro de esta carpeta existen todos los archivos JS responsables de renderizar componentes para el proyecto, fragmentados en carpetas con nombres de cada vista.
            * ```common```: dentro de esta carpeta existen todos los archivos JS renderizan los componentes interrelacionables.
    * ```style```: dentro de esta carpeta se guardarán todos los archivos de estilos personalizados.

NOTAS:
- La carpeta ```test``` dentro de ```component``` y ```template```, posee un ejemplo simple de vista, pudiéndose duplicar cuantas veces se requiera para comenzar el desarrollo real del proyecto.
- Para incluir los componentes duplicados en las vistas, deberán incluirse en los archivos ```main.js``` y ```mainT.js``` dentro de la carpeta ```js``` para su inclusión y renderizado, respectivamente; así como en ```menu.js``` dentro de ```common```.

##Visibilidad
####Visibilidad de cambios:
Para asegurar la visibilidad de los cambios realizados en código del proyecto deberá actualizarse el archivo core de desarrollo a su versión más reciente:
```bash
$ npm run build
```
NOTA: Si existieran errores de sintaxis podrán visualizarse después de este comando.

####Visibilidad del proyecto en el navegador:
```bash
$ node index.js
```
Posteriormente acceder a ```localhost:8080```

## Guías de estilo
Para más información leer los [estándares de arquitectura] de tecnocen, en la sección [lineamientos desarrollo JavaScript].

## Corriendo las pruebas
(Por definir)

## Desempaquetado (deployment)
Para usar el proyecto en ambiente productivo, deberá situarse a nodeJS en ambiente productivo y compilar los archivos core:
* Linux
```bash
$ NODE_ENV=production; npm run build
```
* Windows
```bash
$ set NODE_ENV=production
$ npm run build
```
NOTA: Si existieran errores de sintaxis podrán visualizarse después de estos comandos.

Posteriormente deberán modificarse los siguientes archivos:
* **```client/index.html```:** En este archivo se incluirán los archivos minificados para el login del proyecto.
```bash
...
26 |     <script type="text/javascript" src="/js/vue.js"></script>
...
30 |     <!--<script type="text/javascript" src="/js/vue.min.js"></script>-->
...
35 |     <script type="text/javascript" src="/build/login.bundle.js"></script>
...
39 |     <!--<script type="text/javascript" src="/build/login.min.js"></script>-->
...
```
La línea 26 deberá comentarse, ya que incluye a vueJS en ambiente de desarollo.
La línea 30 deberá descomentarse, ya que incluye a vueJS en ambiente de producción.
La línea 35 deberá comentarse, ya que incluye al core del proyecto generado por webpack en ambiente de desarrollo.
La línea 39 deberá descomentarse, ya que incluye al core del proyecto generado por webpack en ambiente de producción.

* **```client/home.html```:** En este archivo se incluirán los archivos minificados para todo el resto del proyecto.
```bash
...
29 |     <script type="text/javascript" src="/js/vue.js"></script>
...
33 |     <!--<script type="text/javascript" src="/js/vue.min.js"></script>-->
...
38 |     <script type="text/javascript" src="/build/main.bundle.js"></script>
...
42 |     <!--<script type="text/javascript" src="/build/main.min.js"></script>-->
...
```
La línea 29 deberá comentarse, ya que incluye a vueJS en ambiente de desarollo.
La línea 33 deberá descomentarse, ya que incluye a vueJS en ambiente de producción.
La línea 38 deberá comentarse, ya que incluye al core del proyecto generado por webpack en ambiente de desarrollo.
La línea 42 deberá descomentarse, ya que incluye al core del proyecto generado por webpack en ambiente de producción.

Para finalmente visualizar el proyecto en el navegador:
```bash
$ node index.js
```

## Construido con
* [NodeJS] - Backend server.
* [Npm] - Package manager.
* [ExpressJS] - Server framework.
* [VueJS] - Client framework.

## Contribuciones
(Por definir)

## Versionamiento
Para más información leer los [estándares de arquitectura] de tecnocen, en la sección [versionamiento].

## Autores
* **Marcos Jesús Chávez V** - *Tecnocen.com* - [onca-vega]

## Licencia
Licencia ISC.

[Inglés]: ../README.md
[estándares de arquitectura]: https://bitbucket.org/tecnocen/estandares-arquitectura
[control de cambios]: https://bitbucket.org/tecnocen/estandares-arquitectura/src/298c20280d95af4de8923de082baee26e4185d4a/changelog.md?fileviewer=file-view-default
[lineamientos desarrollo JavaScript]: https://bitbucket.org/tecnocen/estandares-arquitectura/src/990d2c74340390c0e375e653e7b0bc11778d54b2/javascript.md?fileviewer=file-view-default
[versionamiento]: https://semver.org/spec/v2.0.0.html
[NodeJS]: https://nodejs.org/
[Npm]: https://www.npmjs.com/
[ExpressJS]: http://expressjs.com/es/
[VueJS]: https://vuejs.org/
[onca-vega]: https://github.com/onca-vega