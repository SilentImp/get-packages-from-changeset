#! /usr/bin/env node

const { program } = require('commander');
const packageJSON = require("./package.json");
const searchChangesetFolder = require('./get-changeset-packages');

program
  .name(packageJSON.name)
  .description(packageJSON.description)
  .version(packageJSON.version)
  .argument('[dir]', 'Folder that contains changeset files.', '.changeset')
  .option('-f, --format [text|json]', 'Format of the output. Supported formats: text and json.', 'text')
  .action(async (dir, { format }) => {
    
    try {
      const result = await searchChangesetFolder(dir);
      let formatted;
      switch(format) {
        case 'json':
          formatted = JSON.stringify(result);
          break;
        case 'text':
          formatted = result.join(', ');
        default:
          
      }
      process.stdout.write(formatted);
    } catch (error) {
      program.error(error.stderr ? error.stderr.toString() : error.message);
    }
  });


  program.parse();