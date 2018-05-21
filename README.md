vuejs-appstructure
============
## Translations
* [English]
* [Spanish]

## Starting
Clone the repository in a local path.
See deployment section in order to run the project in production environment.

### Pre-requisites
- Node.js 8+ (LTS)
Installing nodeJS:
```bash
$ sudo apt-get update
$ sudo apt-get install nodejs
```

- Npm 3.10+
Installing npm:
```bash
$ sudo apt-get install npm
$ npm -v
```

If npm version is under the recomended:
```bash
$ sudo npm install npm@latest -g
```

If nodeJS version is under the recomended:
```bash
$ sudo npm cache clean -f
$ sudo npm install -g n
$ sudo n stable
```

NOTE: nodeJS binary is "nodejs" instead of "node". In order to change this, and use it as "node":
```bash
$ sudo ln -sf /usr/local/n/versions/node/<VERSION>/bin/node /usr/bin/nodejs
```
Where ```<VERSION>``` is the last installed version.

### Proyect installation
#### Clone repository:
```bash
$ git clone https://github.com/tecnocen-com/vuejs-appstructure.git
```

#### Place in the project root path:
```bash
$ cd vuejs-appstructure
```

#### Define all the initial data of your project:
* **```requestHandlers.js```:** In this file you'll define all the conditions to access the ROA service.
```bash
...
4 |     baseURL: "http://34.239.10.155/index.php/api",
5 |     dataURL: "/v1/",
6 |     tokenURL: "/oauth2/token"
...
```
Line 4 ```baseURL``` refers to the root of the ROA service, edit with appropiated URL.
Line 5 ```dataURL``` refers to the part of the URL to access the ROA service data, edit with appropiated URL.
Line 6 ```tokenURL``` refers to the part of the URL to access the ROA service authentication, edit with appropiated URL.

* **```package.json```:** In this file you'll define some other data of your project.
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
Line 2 ```"name"``` refers to the project name, edit with appropiated value (no spaces, all in lowercase).
Line 3 ```"version"``` refers to the project version, edit with appropiated value.
Line 4 ```"description"``` refers to the project description, edit with appropiated value description.
Line 10, 11 and 12 ```"keywords"``` refers to the project keywords, add all the appropiated keywords.
Line 13 ```"author"``` refers to the project author, edit with appropiated author name.
Line 14 ```"license"``` refers to the project author, edit with appropiated license.

* **```CHANGELOG.md```:** In this file you'll define all functions of the project, read more about this on [integration plan] of tecnocen, on section [changes control].
```bash
...
1 | vuejs-appstructure
...
```
Line 1 refers to project name, edit with appropiated name.

* **```README.md```:** In this file you'll define all the project characteristics, such as installation, use and definition.
```bash
...
1 | vuejs-appstructure
...
47 | $ git clone https://github.com/tecnocen-com/vuejs-appstructure.git
...
52 | $ cd vuejs-appstructure
...
```
Line 1 refers to the project name, edit with appropiated value.
Line 47 refers to the project repository URL, edit with appropiated value.
Line 52 refers to the project directory after clone, edit with appropiated value.

Modify the rest of the file according to the project.

#### npm dependencies installation:
```bash
$ npm install
```

## Project structure
* ```build```: in this directory exist all core files generated through webpack module.
* ```client```: in this directory exist all files directly involved with client side.
    * ```assets```: in this directory exist all files involved with a predefined template that could be used.
    * ```file```: in this directory exist all files involved with project processes (such as PDF, XLSX, etc...).
    * ```image```: in this directory exist all images involved with project processes.
    * ```style```: in this directory exist all style files.
    * ```js```: in this directory exist all JavaScript oriented files involved with the project.
        * ```apps```: in this directory exist all the profile based apps.
            * ```home```: in this directory exist all components files per view, once you are logged in.
                * ```components```: in this directory exists all components VUE files.
                    * ```common```: in this directory exists all components VUE files involved over all the project views.
                    * ```dashboard```: in this directory exists the VUE component file related to dashboard.
                    * ```test```: in this directory exists the VUE component file related to test page.
                * ```store```: in this directory exists the vuex store file.
            * ```index```: in this directory exist all components files per view, without any authentication.
                * ```components```: in this directory exists all components VUE files.
                * ```store```: in this directory exists the vuex store file.
        * ```plugins```: in this directory exist all JSX files generated as plugins.

NOTES:
- Directory ```test``` inside of ```home/components```, has an starting component view example, which could be duplicated any time it's needed in order to have the real project running.
- To include the duplicated components to the views of the project, they should be included in ```home.jsx``` file, inside of the directory ```home``` in order to include and render them; and so on in ```Menu.vue``` file inside of the ```common``` directory.

## Visibility
#### Changes visibility:
In order to assure all the changes visibility in the project code, the core files should be updated to it's most recently version:
```bash
$ npm run build
```
NOTE: If there where syntax errors, should be seen after this command.

#### Browser project visibility:
```bash
$ node index.js
```
Then simply access to ```localhost:8080``` in your favourite browser.

## Style guide
For further information, read more about this on [integration plan] of tecnocen, on section [JavaScript coding rules].

## Testing
(In definition)

## Deployment
In order to use the project in a productive environment, nodeJS should be updated to this and then should compiled all the core files:
* Linux
```bash
$ NODE_ENV=production npm run build
```
* Windows
```bash
$ set NODE_ENV=production
$ npm run build
```
NOTE: If there where syntax errors, should be seen after this command.

After this, all the next files should be updated:
* **```client/index.html```:** In this file will be included all the login minified files.
```bash
...
19 |     <script type="text/javascript" src="/build/index.bundle.js"></script>
...
23 |     <!--<script type="text/javascript" src="/build/index.min.js"></script>-->
...
```
Line 19 should be commented, because it includes all webpack core files in development environment.
Line 23 should be uncommented, because it includes all webpack core files in production environment.

* **```client/home.html```:** In this file will be included all the rest of minified files in the project.
```bash
...
20 |     <script type="text/javascript" src="/build/home.bundle.js"></script>
...
24 |     <!--<script type="text/javascript" src="/build/home.min.js"></script>-->
...
```
Line 20 should be commented, because it includes all webpack core files in development environment.
Line 24 should be uncommented, because it includes all webpack core files in production environment.

Finally, in order to see the project running on the browser:
```bash
$ node index.js
```

## Built with:
* [NodeJS] - Backend server.
* [Npm] - Package manager.
* [ExpressJS] - Server framework.
* [VueJS] - Client framework.

## Contributions
(Por definir)

## Versioning
For further information, read more about this on [integration plan] of tecnocen, on section [versioning].

## Authors
* **Marcos Jesús Chávez V** - *Tecnocen.com* - [onca-vega]

## License
ISC license.

[Spanish]: docs/README.md
[integration plan]: https://bitbucket.org/tecnocen/plan_de_integracion
[changes control]: https://bitbucket.org/tecnocen/plan_de_integracion/src/298c20280d95af4de8923de082baee26e4185d4a/changelog.md?fileviewer=file-view-default
[JavaScript coding rules]: https://bitbucket.org/tecnocen/plan_de_integracion/src/990d2c74340390c0e375e653e7b0bc11778d54b2/javascript.md?fileviewer=file-view-default
[versioning]: https://semver.org/spec/v2.0.0.html
[NodeJS]: https://nodejs.org/
[Npm]: https://www.npmjs.com/
[ExpressJS]: http://expressjs.com/es/
[VueJS]: https://vuejs.org/
[onca-vega]: https://github.com/onca-vega
