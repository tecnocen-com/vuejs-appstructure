Rutas web
============

## Comenzando

Clonar el respositorio en un directorio local.

Ver la sección «despliege» (deployment) para notas de como correrlo en un ambiente productivo.

### Pre-requisitos

- Node.js 6+ (LTS)
- Npm 3.10+
- MongoDB 3.0+

### Instalación

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

## (optional) Correr demonio/servicio mongodb

Crear un archivo con el siguiente comando:

```bash
$ sudo vim /etc/systemd/system/mongodb.service
```

Pegar el siguiente texto dentro del archivo:

```
[Unit]
Description=High-performance, schema-free document-oriented database
After=network.target

[Service]
User=mongodb
ExecStart=/usr/bin/mongod --quiet --config /etc/mongod.conf

[Install]
WantedBy=multi-user.target
```

Inicializar el servicio:

```bash
$ sudo systemctl start mongodb
```

Referencias:

- [¿Cómo instalar MongoDB en Ubuntu 16.04?](https://www.digitalocean.com/community/tutorials/como-instalar-mongodb-en-ubuntu-16-04-es).
- [Understanding and Using Systemd](https://www.linux.com/learn/understanding-and-using-systemd).


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
