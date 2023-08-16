const { mdLinks, getAbsolutePath, existPath, getStatsValidate, validateOption} = require('../src/mdLinks');
const fs = require('fs');
const axios = require('axios');
const path = require('path')
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
describe("existPath", () => {
  const rutaExistente = 'C:\\Users\\USUARIO\\Desktop\\DEV007-md-links\\exampleFile';

  it("debería verificar que la ruta exista", () => {
    expect(fs.existsSync(rutaExistente)).toBe(true);
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
// reguex
describe('linkRegex', () => {
  it('debe extraer los enlaces del archivo Markdown', () => {
    const markdownContent = `Este es un archivo Markdown con un [enlace](https://www.youtube.com/watch?v=ivdTnPl1ND0)`;
    const regex = /\[.*?\]\((.*?)\)/g;
    const matches = markdownContent.match(regex);
    expect(matches).toEqual(['[enlace](https://www.youtube.com/watch?v=ivdTnPl1ND0)']);
  });
});
describe("getStatsValidate", () => {
  const links = [
    { url: 'http://example.com', ok: 'ok' },
    { url: 'http://google.com', ok: 'fail' },
    { url: 'http://example.com', ok: 'ok' },
  ];

  it("debería calcular correctamente las estadísticas", () => {
    const result = getStatsValidate(links);
    expect(result.Total).toBe(3);
    expect(result.Unique).toBe(2);
    expect(result.Broken).toBe(1);
  });
});
describe("validateOption", () => {
  const validLink = { url: 'http://example.com' };
  const invalidLink = { url: 'http://nonexistent-url.com' };

  it("debería validar un enlace correctamente", async () => {
    const result = await validateOption(validLink);
    expect(result.status).toBe(200);
    expect(result.ok).toBe('ok');
  });

  it("debería marcar como fallido un enlace no válido", async () => {
    const result = await validateOption(invalidLink);
    expect(result.status).toBe('Error');
    expect(result.ok).toBe('fail');
  });
});



