'use strict';
const parse = require("@changesets/parse").default;
const fs = require('fs').promises;
const path = require('path');
const FORBIDEN_FILES = ['readme.md'];

module.exports = async (folder) => {
    const absolutePath = path.resolve(folder);
    const files = await fs.readdir(absolutePath);
    const filteredFiles = files.filter(file => path.extname(file).toLowerCase() === '.md' && !FORBIDEN_FILES.includes(path.basename(file).toLowerCase()))
    const fileContent = filteredFiles.map(file => fs.readFile(path.join(absolutePath, file), 'utf8'));
    const md = await Promise.all(fileContent);
    const parsed = md.map(content => parse(content).releases).flat().map(release => release.name);
    return parsed;
};