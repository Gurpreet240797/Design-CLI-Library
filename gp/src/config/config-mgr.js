import chalk from "chalk";
import { cosmiconfigSync } from 'cosmiconfig';
const configLoader = cosmiconfigSync('gp');
import Ajv from 'ajv';
const ajv = new Ajv();
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';


export const getConfig = () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    
    const schemaPath = path.resolve(__dirname, 'schema.json');
    const schemaContent = readFileSync(schemaPath, 'utf8');
    const schema = JSON.parse(schemaContent);

    const result = configLoader.search(process.cwd())
      
    if (!result) {
        console.log(chalk.yellow('Could not find configuration, using default'));
        return { port: 1234 };
    } else {
        const isValid = ajv.validate(schema, result.config)

        if (!isValid) {
            console.log(chalk.yellow('Invalid configuration was supplied'));
            console.log(ajv.errors);
            process.exit(1);
        }
        console.log('Found Configuration:', chalk.yellow(JSON.stringify(result.config)));
        return result.config;
    }
}