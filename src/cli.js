#!/usr/bin/env node

const { mdLinks } = require('./mdLinks');
const path = require('path');

const filePath = process.argv[2];

const statsOption = process.argv.includes('--stats');
const validateOption = process.argv.includes('--validate');
const links = [
  { url: 'http://example.com', text: 'Ejemplo' },
  { url: 'http://google.com', text: 'Google' },
 
];
mdLinks(filePath, { stats: statsOption, validate: validateOption })
  .then((result) => console.log(result))
  .catch((error) => console.error(error.message));
