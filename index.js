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
  .option('-e, --exclude [excludePackages...]', 'Exclude packages')
  .option('-i, --include [includePackages...]', 'Only include packages')
  .option('-v, --verbose', 'Output additiona information')
  .action(async (dir, { format, exclude, include, verbose: isVerbose }) => {

    if (isVerbose) {
      console.log({
        dir,
        format,
        exclude,
        include,
        verbose: isVerbose,
      })
    }
    
    try {
      let result = await searchChangesetFolder(dir, isVerbose);
      result = [...new Set(result)];

      if ( Array.isArray(exclude) && exclude.length > 0 ) {
        result = result.filter(item => !exclude.includes(item));
      }

      if ( Array.isArray(include) && include.length > 0 ) {
        result = result.filter(item => include.includes(item));
      }

      if (isVerbose) {
        console.log(result);
      }

      let formatted;
      switch(format) {
        case 'json':
          formatted = JSON.stringify(result);
          break;
        case 'text':
          formatted = result.join(', ');
          break;
        case 'deps':
          if (result.length === 0) {
            formatted = '';
            break;
          }
          formatted = `--filter=...${result.join(' --filter=...')}`;
          break;
        case 'filter':
        default:
          if (result.length === 0) {
            formatted = '';
            break;
          } 
          formatted = `--filter=${result.join(' --filter=')}`;
      }
      console.log(formatted);
    } catch (error) {
      program.error(error.stderr ? error.stderr.toString() : error.message);
    }
  });


program.parse();