#! /usr/bin/env node

const { program } = require('commander');
const packageJSON = require("./package.json");
const searchChangesetFolder = require('./get-changeset-packages');

program
  .name(packageJSON.name)
  .description(packageJSON.description)
  .version(packageJSON.version)
  .argument('[dir]', 'Folder that contains changeset files.', '.changeset')
  .option('-f, --format [text|json|filter|deps]', 'Format of the output. Supported formats: text and json.', 'text')
  .option('-v, --verbose', 'Output additiona information')
  .action(async (dir, { format, verbose: isVerbose }) => {

    if (isVerbose) {
      console.log({
        dir,
        format,
        verbose: isVerbose,
      })
    }
    
    try {
      const result = await searchChangesetFolder(dir, isVerbose);
      let formatted;
      switch(format) {
        case 'json':
          formatted = JSON.stringify(result);
          break;
        case 'text':
          formatted = result.join(', ');
          break;
        case 'deps':
          formatted = `--filter=...${result.join(' --filter=...')}`;
          break;
        case 'filter':
        default:
          formatted = `--filter=${result.join(' --filter=')}`;
      }
      console.log(formatted);
    } catch (error) {
      program.error(error.stderr ? error.stderr.toString() : error.message);
    }
  });


program.parse();