const path = require('path');
const fs = require('fs'); // file system es una libreria

// creamos una funcion mdLinksh
const mdLinks = (
  parameterPath,
  options = { stats: false, validate: true }
) => {
  let absolutPath = '';
  return new Promise((resolve, reject) => {
    console.log('Ruta recibida por parámetro:', parameterPath);

    if (path.isAbsolute(parameterPath)) {
      absolutPath = parameterPath;
    } else {
      // con el resolve convierte la ruta en absoluta
      absolutPath = path.resolve(parameterPath);
    }
    console.log('Ruta absoluta:', absolutPath, 'N°2');

    // verificar si la ruta existe
    if (!fs.existsSync(absolutPath)) {
      // si la ruta no existe saldra un mensaje de error
      console.log('la ruta no existe', '3');
      reject('El archivo no existe');
    }

    console.log('la ruta SI existe', '4');

    const extensionArray = absolutPath.split('.');
    const extension = extensionArray[extensionArray.length - 1];
    console.log('Extensión:', extension, '5');

    if (extension !== 'md') {
      reject('El archivo no es .md');
    }

    // console.log(fileContent);
    const linksFound = extractLinksFromMd(absolutPath);
    if(options.validate){
      for (let i = 0; i < linksFound.length; i++) {
        linksFound[i] = validateLinks(linksFound[i]);

      }
    }

    resolve(linksFound);
  });
};

console.log(mdLinks('exampleFile/folder.md'))

// funcion para extraer los links
function extractLinksFromMd  (absolutPath) {
  // esta expresión regular se utiliza para buscar y capturar el texto del enlace y la URL
  // dentro de un texto que siga el formato de los enlaces en Markdown,
  // donde el texto del enlace está entre corchetes [ ] y la URL está entre paréntesis ( )
  // /g: es un modificador global que indica que la búsqueda debe ser global y
  // no se detiene después de encontrar la primera coincidencia. Esto permite encontrar múltiples enlaces en el texto.

  const fileContent = fs.readFileSync(absolutPath, 'utf-8');
  // expresion regular que busca y captura enlaces en formato markdown dentro del contenido del archivo
  const linkRegex = /\[([^\]]+)\]\(([^\)]+)\)/g;
  // esto permite hallar multiples enlaces en el texto
  // los enlaces capturados se guardan en este arreglo
  const links = [];

  let match;
  while ((match = linkRegex.exec(fileContent)) !== null) {
    const text = match[1].slice(0, 49);
    const url = match[2];

    links.push({ text, url, file: absolutPath });
  }

  return links;
};
// Supongamos que tenemos un objeto "options" que puede tener una propiedad "validate".
/// Supongamos que tenemos un objeto "options" que puede tener una propiedad "validate".
// Si "options.validate" es true, entonces se realizará la validación de los enlaces encontrados en el array "linksFound".
// funcion validate recibe un objeto(link)como argumento
const validateLinks = (link) =>
  fetch(link.url)
    .then((response) => {
      if (response.status >= 200 && response.status < 400) {
        link.status = response.status;
        link.ok = 'ok';
        return link;
      }
      link.status = response.status;
      link.ok = 'fail';
      return link;
    })
    .catch((error) => {
      console.log(error);
      link.status = 'Error';
      link.ok = 'fail';
      return link;
    });
// Verificamos que "options" exista y contenga la propiedad "validate" con valor true antes de proceder.
const options = {
 validate: true, 
 stats: true,
};

const links = extractLinksFromMd('exampleFile/folder.md', options);
const linkStatus = extractLinksFromMd('exampleFile/folder.md', options);
// --------------------------------------

//___________________________________________
const validatedLinks = [];
let linksFound ;
if (options && options.validate) {
  // Creamos un nuevo array para almacenar los enlaces validados.
  

  // Iteramos por cada elemento en el array "linksFound".
  for (let i = 0; i < links.length; i++) {
    // Llamamos a la función "validateLinks" pasándole el enlace actual "linksFound[i]" como argumento.
    // La función "validateLinks" realizará la validación del enlace y retornará el resultado de la validación.
    // El resultado se agrega al nuevo array "validatedLinks".
   // validatedLinks.push(validateLinks(links[i]));
   console.log(validateLinks(links[i]))
  }

  // Ahora el nuevo array "validatedLinks" contiene los enlaces validados y podemos asignarlo nuevamente a "linksFound".
  linksFound = validatedLinks;
}
// Si "options" no existe o "options.validate" es false, el bloque de código dentro del "if" no se ejecutará,
// y la validación no ocurrirá, dejando el array "linksFound" sin cambios.

// funcion que espera a todas las promesas en el array linksFound se resuelvan
Promise.all(linksFound).then((linksFound) => {
  console.log(linksFound, '1')
  // verifica si stats esta habilitada si es asi devuelve un oobjeto: linksFound y stats
  if (options.stats) {
    // resuelve un objeto con dos propiedades linksfound y stats
    if (options.validate) {
     resolve({ linksFound, stats: statsValidateLinks(linksFound) });
    }else{
     return resolve({ linksFound, stats: statsLinks(linksFound) });
    }
     resolve({ linksFound, stats: statsLinks(linksFound) });
  }
   return  resolve({ linksFound });
});



// funcion statslINKS devuelve un objeto con informacion
// sobre los enlaces proporcionados como argumento

const statsLinks = (links) => ({
  // representa la cantidad total de enlaces
  Total: links.length,
  // que representa la cantidad de enlaces únicos (sin repetir)
  Unique: new Set(links.map((link) => link.href)).size,
});

// funcion statsValidateLinks devuelve un objeto con 3 propiedades
// total = cantidad de enlaces
// unique = enlaces unicos
// broken = enlaces rotos
const statsValidateLinks = (links) => {
  // este simbolo me cuesta significa diferente
  const brokenLinks = links.filter((link) => link.ok !== 'ok').length;
  return {
    Total: links.length,
    Unique: new Set(links.map((link) => link.href)).size,
    Broken: brokenLinks,
  };
};

module.exports = {mdLinks};
