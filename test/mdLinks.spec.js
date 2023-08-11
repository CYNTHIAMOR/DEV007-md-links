const { mdLinks, getAbsolutePath} = require('../src/mdLinks');
const fs = require('fs');
const axios =require('axios');
const consoleTable = require('console.table');
const data = [
  [
    {
      file: 'C:\Users\USUARIO\Desktop\node\DEV007-md-links\exampleFile\folder.md',
      href: 'https://gith/workshopper/learnyounode',
      text: 'Markdow',
    },
  ],
];

const rutaRelativa = 'exampleFile';
const rutaAbsoluta = 'C:\\Users\\USUARIO\\Desktop\\DEV007-md-links\\exampleFile';
describe('mdLinks', () => {
  it('should reject when path does not exist', async () => {
    try {
      await mdLinks('./exampleFile/folder.md');
    } catch (error) {
      expect(error.message).toBe('The path does not exist ⛔️');
    }
  });
});

describe('getAbsolutePath', () => {

  it('Debe manejar correctamente las rutas con espacios', () => {
    const rutaConEspacios = 'C:\\Users\\USUARIO\\Carpeta con espacios\\exampleFile';
    const rutaEsperadaConEspacios = 'C:\\Users\\USUARIO\\Carpeta con espacios\\exampleFile';
    expect(getAbsolutePath(rutaConEspacios)).toBe(rutaEsperadaConEspacios);
  });

  it('Debe manejar correctamente las rutas con barras invertidas y barras normales', () => {
    const rutaConBarrasMezcladas = 'C:\\Users\\USUARIO\\DEV007-md-links\\exampleFile';
    const rutaEsperadaConBarrasMezcladas = 'C:\\Users\\USUARIO\\DEV007-md-links\\exampleFile';
    expect(getAbsolutePath(rutaConBarrasMezcladas)).toBe(rutaEsperadaConBarrasMezcladas);
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
