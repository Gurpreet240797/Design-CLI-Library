#!/usr/bin/env node
import arg from 'arg'
import chalk from 'chalk'
import { readFileSync } from 'fs';
import * as pkgUp from 'pkg-up'

try {
    const args = arg({
        '--start': Boolean,
        '--build': Boolean
    })

    if (args['--start']) {
        const pkgPath = pkgUp.pkgUpSync({cwd: process.cwd()});
        const pkgJSONString = readFileSync(pkgPath, 'utf8')
        const pkg = JSON.parse(pkgJSONString)
        
        if (JSON.stringify(pkg.gp)) {
            console.log('Found Configuration:', chalk.yellow(JSON.stringify(pkg.gp)));
        } else {
            console.log(chalk.yellow('Found Not Configuration'));
        }
        
        console.log(chalk.bgCyanBright('Starting the app'))
    }
} catch (e) {
    console.log(chalk.yellow(e.message))
    console.log();
    usage()
}

function usage() {
  console.log(`${chalk.inverse('tool [CMD]')}
  ${chalk.greenBright('--start')}\tStarts the app
  ${chalk.greenBright('--build')}\tBuilds the app`);
}