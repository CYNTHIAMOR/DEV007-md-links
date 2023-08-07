const fetch = jest.createMockFromModule("node-fetch");
// Importar el módulo correcto, "../src/mdLinks"
const {
  existRoute,
  convertToAbsolute,
  verifyDirectory,
  openedDirectory,
  filterFile,
  gettinlinks,
  statusLinks,
} = require('../src/mdLinks');

const routeRelative = "exampleFile";
const routeAbsolute = "C:\\Users\\USUARIO\\Desktop\\DEV007-md-links\\exampleFile";
const routeFalse = "C:\\Users\\USUARIO\\Cynthia\\DEV007-md-links\\exampleFile";
const folder = "C:\\Users\\USUARIO\\Desktop\\DEV007-md-links\\exampleFile";
const file = [
  "C:\\Users\\USUARIO\\Desktop\\DEV007-md-links\\exampleFile\\folder.md",
];
const notDirectory =
  "C:\\Users\\USUARIO\\Desktop\\DEV007-md-links\\README.md";
const arrayEmpty = [];
const testFile =
  "C:\\Users\\USUARIO\\Desktop\\DEV007-md-links\\exampleFile\\file.txt";
const testing = [
  "C:\\Users\\USUARIO\\Desktop\\DEV007-md-links\\exampleFile\\folder.md",
  "C:\\Users\\USUARIO\\Desktop\\DEV007-md-links\\README.md",
];

const dataTest = [
  {
    file: "C:\\Users\\USUARIO\\Desktop\\DEV007-md-links\\exampleFile\\folder.md",
    href: "https://gith/workshopper/learnyounode",
    text: "learnyounode",
    status: "Error",
    ok: "fail",
  },
  {
    file: "C:\\Users\\USUARIO\\Desktop\\DEV007-md-links\\exampleFile\\folder.md",
    href: "https://github.com/workshopper/how-to-npm",
    text: "how-to-npm",
    status: 200,
    ok: "ok",
  },
  {
    file: "C:\\Users\\USUARIO\\Desktop\\DEV007-md-links\\exampleFile\\folder.md",
    href: "https://github.com/stevekane/promise-it-wont-hurt",
    text: "promise-it-wont-hurt",
    status: 200,
    ok: "ok",
  },
  // ... otras URL ...
];

describe("convertToAbsolute", () => {
  it("convertToAbsolute", () => {
    expect(convertToAbsolute(routeRelative)).toEqual(routeAbsolute);
  });
});

describe("existRoute is false ", () => {
  test("existRoute", () => {
    expect(existRoute(routeFalse)).toBe(false);
  });
});

describe("existsRoute is true", () => {
  test("existRoute", () => {
    expect(existRoute(routeRelative)).toBe(true);
  });
});

describe("verifyDirectory", () => {
  it("retorna true si la ruta es un directorio", () => {
    expect(verifyDirectory(routeAbsolute)).toBe(true);
  });
  it("retorna false si la ruta no es un directorio", () => {
    expect(verifyDirectory(notDirectory)).toBe(false);
  });
});

describe("openedDirectory", () => {
  it("Debería abrir un directorio y mostrar una matriz de archivos", () => {
    expect(openedDirectory(folder)).toEqual(testing);
  });
});

describe("filterFile", () => {
  it("Debería filtrar una matriz y mantener solo archivos md", () => {
    expect(filterFile(testing)).toEqual([testing[0]]);
  });
});

describe("gettinlinks", () => {
  it("Debería mostrar una matriz con todos los enlaces de los archivos .md", () => {
    expect(gettinlinks(file)).toEqual(dataTest);
  });
  it("Debverifica si la función gettinlinks(file) devuelve el valor esperado dataTest",() => {
    expect(gettinlinks(testFile)).toEqual(arrayEmpty);
  });
  it("Debería mostrar y vaciar la matriz cuando no hay ningún enlace dentro del archivo .md", () => {
    expect(gettinlinks(routeAbsolute)).toEqual(arrayEmpty);
  });
});

describe("statusLinks", () => {
  test("Debería mostrar una matriz con file, href, ok, status and text", () => {
    fetch.mockImplementation(() =>
      Promise.resolve([
        {
          href: "https://www.youtube.com/watch?v=8GTaO9XhA5M",
          text: "Java Script en 10 minutos",
          file: "C:\\Users\\USUARIO\\Desktop\\DEV007-md-links\\exampleFile\\folder.md",
          status: 200,
          ok: "OK",
        },
      ])
    );
    return statusLinks([
      {
        href: "https://www.youtube.com/watch?v=8GTaO9XhA5M",
        text: "Java Script en 10 minutos",
        file: "C:\\Users\\USUARIO\\Desktop\\DEV007-md-links\\exampleFile\\folder.md",
        status: 200,
        ok: "OK",
      },
    ]).then((data) => {
      expect(data).toEqual([validate]);
    });
  });
});
