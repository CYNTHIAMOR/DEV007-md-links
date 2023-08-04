#!/usr/bin/env node
const { mdLinks } = require('./mdLinks');
// Obtenemos el tercer argumento ingresado en la línea de comandos y lo almacenamos en 'filePath'.
const filePath = process.argv[2];

// Verificamos si el argumento '--stats' está presente en los argumentos ingresados
// en la línea de comandos, y almacenamos el resultado en 'statsOption'.
const statsOption = process.argv.includes('--stats');
// Verificamos si el argumento '--validate' está presente en los argumentos
// ingresados en la línea de comandos, y almacenamos el resultado en 'validateOption'.
const validateOption = process.argv.includes('--validate');
// Llamamos a la función 'mdLinks' pasando como argumento
// la ruta del archivo ('filePath') y un objeto con las opciones 'stats' y 'validate'.
mdLinks(filePath, { stats: statsOption, validate: validateOption })
  .then((result) => console.log(result))
  // Si la promesa se resuelve con éxito, mostramos el resultado en la consola.
  .catch((error) => console.log(error))
// Si la promesa es rechazada (ocurre un error), mostramos el error en la consola.
