#!/usr/bin/env node

const ora = require('ora');
const chalk = require('chalk');
const meow = require('meow');
const api = require('./api');
const crawl = require('./crawl');

// Cli
const cli = meow(`
    Usage
	  $ instagram-profilecrawl <input>
	  
	Options
	  --method, -m define method (default api)
	  --output, -o define output file (default profile_<input>.json)

	Examples
	  $ instagram-profilecrawl nacimgoura emmawatson
`, {
    flags: {
        method: {
            type: 'string',
			alias: 'm'
        },
		output: {
        	type: 'string',
			alias: 'o'
		}
    }
});

// Init spinner
const spinnerLoading = ora(chalk.blue('Init script!'));

// Test if name is entered
const listProfileName = cli.input;
if (listProfileName.length <= 0) {
	spinnerLoading.fail(chalk.red('No name entered!'));
	process.exit();
}

if (cli.flags.method) {
    if (cli.flags.method === 'selenium' || cli.flags.m === 'selenium') {
        crawl.start(listProfileName, cli.flags);
    } else {
        api.start(listProfileName, cli.flags);
    }
} else {
    api.start(listProfileName, cli.flags);
}
