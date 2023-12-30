#!/usr/bin/env node
import arg from 'arg'
import chalk from 'chalk'
import { getConfig } from '../src/config/config-mgr.js'
import { start } from '../src/commands/start.js'
import createLogger from '../src/logger.js'
const logger = createLogger('bin')

try {
    const args = arg({
        '--start': Boolean,
        '--build': Boolean
    })

    if (args['--start']) {
        const config = getConfig();
        start(config);
    }
} catch (e) {
    logger.warning(e.message)
    console.log();
    usage()
}

function usage() {
  console.log(`${chalk.inverse('tool [CMD]')}
  ${chalk.greenBright('--start')}\tStarts the app
  ${chalk.greenBright('--build')}\tBuilds the app`);
}