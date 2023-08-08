const { getAbsolutePath, linkRegex, stats, absolutPath, statsContent, gettinlinks, validateLink} = require("../src/mdLinks");
const fs = require('fs');
const path = require('path');

const rutaRelativa = 'exampleFile';
const rutaAbsoluta = 'C:\\Users\\USUARIO\\Desktop\\DEV007-md-links\\exampleFile';
 

describe('getAbsolutePath', () => {
  it('Debe devolver una ruta absoluta', () => {
    expect(getAbsolutePath(rutaRelativa)).toBe(rutaAbsoluta);
  });
  it('Debe manejar correctamente las rutas con espacios', () => {
    const rutaConEspacios = 'C:\\Users\\USUARIO\\Desktop\\Carpeta con espacios\\exampleFile';
    const rutaEsperadaConEspacios = 'C:\\Users\\USUARIO\\Desktop\\Carpeta con espacios\\exampleFile';
    expect(getAbsolutePath(rutaConEspacios)).toBe(rutaEsperadaConEspacios);
  });

  it('Debe manejar correctamente las rutas con barras invertidas y barras normales', () => {
    const rutaConBarrasMezcladas = 'C:\\Users\\USUARIO\\Desktop\\DEV007-md-links\\exampleFile';
    const rutaEsperadaConBarrasMezcladas = 'C:\\Users\\USUARIO\\Desktop\\DEV007-md-links\\exampleFile';
    expect(getAbsolutePath(rutaConBarrasMezcladas)).toBe(rutaEsperadaConBarrasMezcladas);
  });

  it('Debe manejar correctamente las rutas relativas que contienen ".."', () => {
    const rutaRelativaConPuntos = "../../exampleFile";
    const rutaEsperadaConPuntos = "C:\\Users\\USUARIO\\exampleFile"; // Esto es solo un ejemplo, ajústalo según tu salida esperada.
    expect(getAbsolutePath(rutaRelativaConPuntos)).toBe(rutaEsperadaConPuntos);
  });
});
describe('linkRegex', () => {
  it('debe extraer los enlaces del archivo Markdown', () => {
    const markdownContent = `Este es un archivo Markdown con un [enlace](https://www.youtube.com/watch?v=ivdTnPl1ND0)`;
    const regex = /\[.*?\]\((.*?)\)/g;
    const matches = markdownContent.match(regex);
    expect(matches).toEqual(['[enlace](https://www.youtube.com/watch?v=ivdTnPl1ND0)']);
  });
});
describe('validateLink', () => {
  test('valida un link',() => {
     validateLink (        {
      url: 'https://github.com/stevekane/promise-it-wont-hurt',
        text: 'promise-it-wont-hurt',
        file:  'C:\\Users\\USUARIO\\Desktop\\DEV007-md-links\\exampleFile\\folder.md',
  
      })
     .then((data) => {
      expect(data).toEqual( {
        url: 'https://github.com/stevekane/promise-it-wont-hurt',
          text: 'promise-it-wont-hurt',
          file:  'C:\\Users\\USUARIO\\Desktop\\DEV007-md-links\\exampleFile\\folder.md',
         status: 200,
          ok: 'ok',
        }); 
    });
  });
});
/* describe('validateLink', () => {
  test('valida un link', () => {
   
      Promise.resolve([
        {
        url: 'https://github.com/stevekane/promise-it-wont-hurt',
          text: 'promise-it-wont-hurt',
          file:  'C:\\Users\\USUARIO\\Desktop\\DEV007-md-links\\exampleFile\\folder.md',
          status: 200,
          ok: 'OK',
        },
      ])
    
    return validateLink([
      {
      url:'https://nodejs.org/es/about/',
        text: 'Acerca de Node.js - Documentación oficial',
        file:'C:\\Users\\USUARIO\\Desktop\\DEV007-md-links\\exampleFile\\folder.md',
        status: 200,
        ok: 'OK',
      },
    ]).then((data) => {
      expect(data).toEqual([validate]);
    });
  });
}); */


/* describe('stats', () => {
  it('debe verificar si la ruta existe y si es un archivo.md', () => {
    const rutaConEspacios = "C:\\Users\\USUARIO\\Desktop\\DEV007-md-links\\example File\\folder.md";
    const rutaEsperadaMd = "C:\\Users\\USUARIO\\Desktop\\DEV007-md-links\\exampleFile\\folder.md";
     expect(stats).toBe(rutaEsperadaMd);'
    // Reemplaza absolutPath con rutaConEspacios para obtener la ruta completa con espacios
    const stats = fs.stat(rutaConEspacios); 
    if (!stats.isFile() || path.extname(rutaConEspacios) !== '.md') {
     
    }

  });
}); ----------------- */
