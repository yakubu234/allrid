import fs = require('fs');
import dotenv from 'dotenv';
import path from 'path';
const rootDir = path.resolve(__dirname, '..');
dotenv.config({ path: path.join(rootDir, 'env', '.env') });

function getTypeOrmConfig(){
    function getValue(key: string, throwOnMissing = true): any {
        const value = process.env[key];
        if (!value && throwOnMissing) {
          throw new Error(`config error - missing env.${key}`);
        }
    
        return value;
    }

    const environments = ['development', 'test', 'production'];
    const config: { [key: string]: any } = {};

    environments.forEach(env => {
        config[env] = {
            dialect: getValue(`DATABASE_DIALECT`),
            host: getValue(`DATABASE_HOST`),
            port: parseInt(getValue(`DATABASE_PORT`)),
            username: getValue(`DATABASE_USER`),
            password: getValue(`DATABASE_PASSWORD`),
            database: getValue(`DATABASE_NAME`)
        };
    });

    return config;
}

fs.writeFileSync(
  'src/config/config.json',
  JSON.stringify(getTypeOrmConfig(), null, 2)
);

