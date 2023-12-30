import createLogger from "../logger.js";
import chalk from "chalk";
import { cosmiconfigSync } from 'cosmiconfig';
const configLoader = cosmiconfigSync('gp');
import betterAjvErrors from 'better-ajv-errors'
import Ajv from 'ajv';
const ajv = new Ajv({jsProperty: true});
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
const logger = createLogger('config:mgr');

export const getConfig = () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const schemaPath = path.resolve(__dirname, 'schema.json');
    const schemaContent = readFileSync(schemaPath, 'utf8');
    const schema = JSON.parse(schemaContent);

    const result = configLoader.search(process.cwd())
      
    if (!result) {
        logger.warning('Could not find configuration, using default');
        return { port: 1234 };
    } else {
        const isValid = ajv.validate(schema, result.config)

        if (!isValid) {
            logger.warning('Invalid configuration was supplied');
            console.log(betterAjvErrors(schema, result.config, ajv.errors));
            process.exit(1);
        }
        
        logger.debug('Found Configuration:', chalk.yellow(JSON.stringify(result.config)));
        return result.config;
    }
}