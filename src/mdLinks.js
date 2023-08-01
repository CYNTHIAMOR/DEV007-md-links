const path = require('path');
const fs = require('fs'); // file system es una libreria

// creamos una funcion mdLinks
const mdLinks = (parameterPath, options = { stats: false, validate: false }) => {
  let absolutPath = '';
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-console
    console.log('Ruta recibida por parámetro:', parameterPath, options);

    if (path.isAbsolute(parameterPath)) {
      absolutPath = parameterPath;
    } else {
      // con el resolve convierte la ruta en absoluta
      absolutPath = path.resolve(parameterPath);
    }
    // eslint-disable-next-line no-console
    console.log('Ruta absoluta:', absolutPath);

    // verificar si la ruta existe
    if (!fs.existsSync(absolutPath)) {
      // si la ruta no existe saldra un mensaje de error
      // eslint-disable-next-line no-console
      console.log('la ruta no existe');
      // eslint-disable-next-line no-console
      reject('El archivo no existe');
    }

    console.log('la ruta SI existe');

    const extensionArray = absolutPath.split('.');
    const extension = extensionArray[extensionArray.length - 1];
    // eslint-disable-next-line no-console
    console.log('Extensión:', extension);

    if (extension !== 'md') {
      reject('El archivo no es .md');
    }

    // console.log(fileContent);
    const linksFound = extractLinksFromMd(absolutPath);

    resolve(linksFound);
  });
};

console.log(mdLinks('exampleFile/folder.md'));

// funcion para extraer los links
function extractLinksFromMd(absolutPath) {
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
}
if (options.validate) {
  for (let i = 0; i < linksFound.length; i++) {
    linksFound[i] = validateLinks(linksFound[i]);
  }
}
// funcion que espera a todas las promesas en el array linksFound se resuelvan
Promise.all(linksFound).then((linksFound) => {
  // verifica si stats esta habilitada si es asi devuelve un oobjeto: linksFound y stats
  if (options.stats) {
    // resuelve un objeto con dos propiedades linksfound y stats
    if (options.validate) {
      return resolve({ linksFound, stats: statsValidateLinks(linksFound) });
    }
    return resolve({ linksFound, stats: statsLinks(linksFound) });
  }

  return resolve({ linksFound });
});

// funcion validate recibe un objeto(link)como argumento
const validateLinks = (link) => fetch(link.url)
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

module.exports = mdLinks;
