#!/usr/bin/env node
const path = require('path');
const fs = require('fs').promises;
const axios = require('axios');

// Verifica si es una ruta absoluta
const existPath = function (relativePath) {
  if (fs.existsSync(relativePath)) {
    console.log("La ruta SI existe");
  } else {
    console.log("NO se encontró una ruta");
  }
}

const getAbsolutePath = function (parameterPath) {
  return path.isAbsolute(parameterPath)
    ? parameterPath
    : path.resolve(parameterPath);
};

const mdLinks = async (
  parameterPath,
  options = { stats: false, validate: false }
) => {
  try {
    // Verifica si es una ruta absoluta o relativa
    const absolutPath = getAbsolutePath(parameterPath);

    // Verifica si es un archivo .md
    const stats = await fs.stat(absolutPath);
    if (!stats.isFile() || path.extname(absolutPath) !== '.md') {
      throw new Error('La ruta no es un archivo .md⛔️');
    }

    // Leer el contenido del archivo en la ruta absoluta
    const fileContent = await fs.readFile(absolutPath, 'utf-8');

    const linkRegex = /\[([^\]]+)\]\(([^\)]+)\)/g;
    const linksFound = [];
    let match;

    // Encuentra coincidencias y extrae el texto y la URL del enlace
    while ((match = linkRegex.exec(fileContent)) !== null) {
      const text = match[1].slice(0, 49);
      const url = match[2];
      linksFound.push({ text, url, file: absolutPath });
    }

    if (options.validate && options.stats) {
      await Promise.all(linksFound.map(validateOption));
      return { links: linksFound, stats: getStatsValidate(linksFound) };
    }

    if (options.validate) {
      await Promise.all(linksFound.map(validateOption));
      return linksFound;
    }

    if (options.stats) {
      return { links: linksFound, stats: statsOption(linksFound) };
    }
// work
    return linksFound;
  } catch (error) {
    throw new Error(`⛔️Error la ruta es incorecta : ${error.message}`);
  }
};

const validateOption = async (link) => {
  try {
    const response = await axios.get(link.url);
    link.status = response.status;
    link.ok = response.status >= 200 && response.status < 400 ? 'ok' : 'fail';
    return link;
  } catch (error) {
    link.status = 'Error';
    link.ok = 'fail';
    return link;
  }
};

const statsOption = (links) => ({
  Total: links.length,
  Unique: new Set(links.map((link) => link.url)).size,
});

const getStatsValidate = (links) => {
  const brokenLinks = links.filter((link) => link.ok !== "ok");
  return {
    Total: links.length,
    Unique: new Set(links.map((link) => link.url)).size,
    Broken: brokenLinks.length,
  };
};

module.exports = { mdLinks, getAbsolutePath, existPath, getStatsValidate, validateOption, statsOption };