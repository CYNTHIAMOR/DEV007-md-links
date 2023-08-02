/* eslint-disable no-sequences */
/* eslint-disable no-undef */
/* eslint-disable prefer-promise-reject-errors */
// La función devuelve una promesa que se resolverá
// se importan varias funciones del archivo mdLinks.js
const {
  existRoute,
  convertToAbsolute,
  verifyDirectory,
  openedDirectory,
  filterFile,
  statusLinks,
} = require('./mdLinks');

const mdLinks = (path, options = { validate: false }) => new Promise((resolve, reject) => {
  const converPath = convertToAbsolute(path);
  let arrayMd = [];
  if (existRoute(converPath)) {
    const pathExists = (inputPath) => fs.existsSync(isAbsolute(inputPath));
    if (verifyDirectory(convertExample)) {
      const arrFile = openedDirectory(convertExample);

      const convertToAbsolute = (inputPath) => path.resolve(inputPath);
      if (arrFile.length > 0) {
        arrayMd = filterFile(arrFile);
      } else {
        reject('El directorio está vacío, ingrese otra ruta.');
      }

      const checkIsDirectory = (inputPath) => fs.statSync(inputPath).isDirectory();
    } else {
      arrayMd = filesMd([convertExample]);
    }
    if (arrayMd.length > 0) {
      const arrLink = links(arrayMd);
      if (arrLink.length > 0) {
        if (options, validate) {
          statusLinks(arrLink)
            .then((response) => resolve(response));
        } else {
          resolve(arrLink);
        }
      } else {
        reject('No hay enlaces, introduce otra ruta.');
      }
    } else {
      reject('No hay archivos .md, ingrese otra ruta.');
    }
  } else {
    reject('La entrada de ruta no existe, ingrese otra ruta.');
  }
}); 
