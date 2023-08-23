# Markdown Links
![Alt text](<https://github.com/CYNTHIAMOR/DEV007-md-links/blob/main/src/img/cynthiamdlink.png?raw=true>)
## Índice

* [1. Preámbulo](#1-preámbulo)
* [2. Resumen del proyecto](#2-resumen-del-proyecto)
* [3. Planificación](#3-planificación) 
* [4. Diagrama de flujo](#4-diagrama-de-flujo)
* [5. Guía de uso e instalación](#5-guia-de-uso-e-instalación)
* [6. archivos del proyecto](#6-archivos-del-proyecto)
* [7. Documentación técnica de la biblioteca](#7-documentación-tecnica-del-proyecto)
* [8. Trabajo se resolvio de manera individual](#9-trabajo-se-resolvio-de-manera-individual)
* [9. Checklist](#9-checklist)

***

## 1. Preámbulo# Markdown Links
¡Bienvenido al proyecto Validador de Enlaces en Markdown! Esta es una herramienta simple diseñada para extraer y validar enlaces de archivos Markdown. Puede ayudarte a identificar enlaces rotos o inválidos dentro de tu contenido Markdown.
---

## 2. Resumen del proyecto

El Validador de Enlaces en Markdown es un proyecto basado en Node.js que proporciona funciones para extraer y validar enlaces de archivos Markdown. Incluye funciones de utilidad para manipular rutas de archivos, extraer enlaces y validar su estado.
El proyecto implica la creación de una biblioteca de JavaScript personalizada.

## 3. Planificación

El proyecto se desarrolló en 5 sprints, y la planificación y seguimiento se realizó utilizando la
herramienta trello y Github , como se muestra a continuación:

![Alt text](<https://github.com/CYNTHIAMOR/DEV007-md-links/blob/main/src/img/trellorg.png?raw=true>)


## 4. Diagrama de flujo

![Alt text](<https://github.com/CYNTHIAMOR/DEV007-md-links/raw/main/src/img/primera.png>)
![Alt text](<https://github.com/CYNTHIAMOR/DEV007-md-links/raw/main/src/img/segunda.png>)

## 5. Guía de uso e instalación 🛠️

Para usar este proyecto, necesitas tener Node.js instalado en tu sistema. Si no lo tienes instalado, puedes descargarlo desde el sitio web oficial de Node.js.

Clona este repositorio en tu máquina local usando tu método preferido.
Navega al directorio del proyecto usando tu terminal.
Ejecuta el siguiente comando para instalar las dependencias del proyecto:
`npm i md-links-cynthia-moreategui`

Puedes utilizar el Validador de Enlaces en Markdown en tus proyectos importando las funciones necesarias. A continuación, te presento una guía paso a paso sobre cómo usarlo:

-Importa las funciones requeridas en la parte superior de tu script:
## 6. Archivos del proyecto🛠️

- `README.md` con descripción del módulo, instrucciones de instalación/uso,
  documentación del API y ejemplos.
- `mdLinks.js`: En este archivo se implementa la lógica para entregar los resultados
  del código de acuerdo con la solkicitud del usuario.
- `package.json` con nombre, versión, descripción, autores, licencia,
  dependencias, scripts (pretest, test, ...), main, bin
- `.editorconfig` con configuración para editores de texto. Este archivo no se
  debe cambiar.
- `.eslintrc` con configuración para linter. Este archivo contiene una
  configuración básica para ESLint, si deseas agregar reglas adicionales
  como Airbnb deberás modificar este archivo.
- `.gitignore` para ignorar `node_modules` u otras carpetas que no deban
  incluirse en control de versiones (`git`).
- `test/md-links.spec.js` debe contener los tests unitarios para la función
  `mdLinks()`. Su implementación debe pasar estos tests.

## 7. Documentación técnica de la biblioteca

Markdown es un lenguaje de marcado ligero muy popular entre los desarrolladores.
Se usa mucho en varias plataformas que manejan texto sin formato (como GitHub, foros,
blogs, etc.), y es muy común encontrar varios archivos en este formato en cualquier
repositorio, comenzando con el tradicional README.md.

Estos archivos de Markdown normalmente contienen links que muchas veces están rotos
o no son válidos y eso perfudica mucho el valor de la información que se quiere compartir.

El objetivo de esta herramienta de línea de comandos (CLI) es verificar archivos .md y verificar si contienen enlaces mientras indica si estos enlaces son válidos o no.

## Este proyecto consta de DOS partes

##### JavaScript API

El módulo debe poder **importarse** en otros scripts de Node.js y debe ofrecer la
siguiente interfaz:

#### `mdLinks(path, options)`

##### Argumentos

- `path`: Ruta **absoluta** o **relativa** al **archivo** o **directorio**.
  Si la ruta pasada es relativa, debe resolverse como relativa al directorio
  desde donde se invoca node - _current working directory_).
- `options`: Un objeto con **únicamente** la siguiente propiedad:
  - `validate`: Booleano que determina si se desea validar los links
    encontrados.

##### Valor de retorno

La función debe **retornar una promesa** (`Promise`) que **resuelva a un arreglo**
(`Array`) de objetos (`Object`), donde cada objeto representa un link y contiene
las siguientes propiedades

Con `validate:false` :

- `href`: URL encontrada.
- `text`: Texto que aparecía dentro del link (`<a>`).
- `file`: Ruta del archivo donde se encontró el link.


Con `validate:true` :

- `href`: URL encontrada.
- `text`: Texto que aparecía dentro del link (`<a>`).
- `file`: Ruta del archivo donde se encontró el link.
- `status`: Código de respuesta HTTP.
- `ok`: Mensaje `fail` en caso de fallo u `ok` en caso de éxito.


#### Options

##### `--validate`

Si pasamos la opción `--validate`, el módulo debe hacer una petición HTTP para
averiguar si el link funciona o no. Si el link resulta en una redirección a una
URL que responde ok, entonces consideraremos el link como ok.
![Alt text](<https://github.com/CYNTHIAMOR/DEV007-md-links/raw/main/src/img/validate.png.jpeg>)


##### `--stats`

Si pasamos la opción `--stats` el output (salida) será un texto con estadísticas
básicas sobre los links.
![Alt text](<https://github.com/CYNTHIAMOR/DEV007-md-links/raw/main/src/img/stats.jpeg>)


##### `--validate y --stats`

También podemos combinar `--stats` y `--validate` para obtener estadísticas que
necesiten de los resultados de la validación.
![Alt text](</https://github.com/CYNTHIAMOR/DEV007-md-links/raw/main/src/img/validate-stats.jpeg>)
 
 sin opciones 
 ![Alt text](<https://github.com/CYNTHIAMOR/DEV007-md-links/raw/main/src/img/sin-options.jpeg>)

 ruta invalida 
 ![Alt text](<https://github.com/CYNTHIAMOR/DEV007-md-links/raw/main/src/img/ruta-error.jpeg>)

## 8. El trabajo se resolvió de manera individual

Cynthia Reátegui - Front End Developer

## 9. Checklist

### General

- [✔] Puede instalarse via `npm install --global <github-user>/md-links`

### `README.md`

- [✔] Un board con el backlog para la implementación de la librería.
- [✔] Documentación técnica de la librería.
- [✔] Guía de uso e instalación de la librería

### API `mdLinks(path, opts)`

- [✔] El módulo exporta una función con la interfaz (API) esperada.
- [✔] Implementa soporte para archivo individual
- [✔] Implementa `options.validate`

### INDEX

- [✔] Implementa `--validate`
- [✔] Implementa `--stats`

### Pruebas / tests
El proyecto incluye pruebas unitarias para garantizar su funcionalidad. Estas pruebas se encuentran en el directorio __tests__ y utilizan el marco de pruebas Jest.

Para ejecutar las pruebas, navega al directorio del proyecto en tu terminal y ejecuta el siguiente comando:
`npm test`
![Alt text](<https://github.com/CYNTHIAMOR/DEV007-md-links/raw/main/src/img/test.png.jpeg>)

- [✔] Pruebas unitarias cubren un mínimo del 70% de statements, functions,
  lines, y branches.
- [✔] Pasa tests (y linters) (`npm test`).

**No dudes en preguntar si tienes alguna pregunta o necesitas más ayuda. ¡Feliz codificación! 🚀**
