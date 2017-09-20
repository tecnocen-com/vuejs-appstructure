Rutas web
============

## Comenzando

Clonar el respositorio en un directorio local.

Ver la sección «despliege» (deployment) para notas de como correrlo en un ambiente productivo.

### Pre-requisitos

- Node.js 6+ (LTS)

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
En donde ```bash<VERSION>``` es la última versión instalada.

### Instalación de proyecto

Clonar el repositorio:

```bash
$ git clone git@bitbucket.org:tecnocen/rutas_web.git
```

Entrar en el proyecto e instalar dependencias npm:

```bash
$ cd rutas_web/ && npm install
```

Inicializar el proyecto con:

```bash
$ node index.js
```

## Corriendo las pruebas

(Por definir)

### Guías de estilo

(Por definir)

## Desempaquetado (deployment)

(Por definir)

## Construido con

* [Node.js](https://nodejs.org/) - Backend server.
* [Npm](https://www.npmjs.com/) - Package manager.
* [Express](http://expressjs.com/es/) - The web framework used.
* [MongoDB](https://www.mongodb.com/) - Document database.
* [Vue.js](https://vuejs.org/) - Document database.

## Contribuciones

(Por definir)

## Versionamiento

(Por definir)

## Autores

* **Marcos Jesús Chávez V** - *Tecnocen.com* - [onca-vega](https://github.com/onca-vega)

## Licencia

(Por definir)
