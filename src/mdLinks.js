const path = require('path');
const fs = require('fs').promises; // Utilizamos fs.promises para trabajar con promesas

const getAbsolutePath = function(parameterPath){
  return path.isAbsolute(parameterPath)
      ? parameterPath
      : path.resolve(parameterPath);
}

// Creamos una función mdLinks
const mdLinks = async (
  parameterPath,
  options = { stats: false, validate: true }
) => {
  try {
    // Obtenemos la ruta absoluta del archivo
    const absolutPath = getAbsolutePath(parameterPath)

    // Verificamos si la ruta existe y si es un archivo .md
    const stats = await fs.stat(absolutPath);
    if (!stats.isFile() || path.extname(absolutPath) !== '.md') {
      throw new Error('La ruta no es un archivo .md');
    }

    // Leemos el contenido del archivo
    const fileContent = await fs.readFile(absolutPath, 'utf-8');

    // Expresión regular para extraer los enlaces del archivo Markdown
    const linkRegex = /\[([^\]]+)\]\(([^\)]+)\)/g;

    // Array para almacenar los enlaces encontrados
    const linksFound = [];
    let match;
    while ((match = linkRegex.exec(fileContent)) !== null) {
      const text = match[1].slice(0, 49);
      const url = match[2];

      linksFound.push({ text, url, file: absolutPath });
    }

    if (options.validate) {
      // Si la opción "validate" es true, validamos cada enlace
      await Promise.all(linksFound.map(validateLink));
    }

    if (options.stats) {
      // Si la opción "stats" es true, obtenemos las estadísticas de los enlaces
      return { links: linksFound, stats: getStats(linksFound) };
    }

    return linksFound;
  } catch (error) {
    throw new Error(`Error al procesar el archivo: ${error.message}`);
  }
};

// Función para validar un enlace
const validateLink = (link) =>
  fetch(link.url)
    .then((response) => {
      link.status = response.status;
      link.ok = response.status >= 200 && response.status < 400 ? 'ok' : 'fail';
      return link;
    })
    .catch((error) => {
      link.status = 'Error';
      link.ok = 'fail';
      return link;
    });

// Función para obtener las estadísticas de los enlaces
const getStats = (links) => ({
  Total: links.length,
  Unique: new Set(links.map((link) => link.url)).size,
  Broken: links.filter((link) => link.ok === 'fail').length,
});

// Ejemplo de uso
const options = {
  validate: true,
  stats: true,
};

mdLinks('exampleFile/folder.md', options)
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

module.exports = { mdLinks, getAbsolutePath, validateLink };
