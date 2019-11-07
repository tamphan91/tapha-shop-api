import * as dotenv from 'dotenv';
import * as Joi from '@hapi/joi';
import * as fs from 'fs';

export type EnvConfig = Record<string, string>;

export class ConfigService {
    private readonly envConfig: EnvConfig;

    constructor(filePath: string) {
        const config = dotenv.parse(fs.readFileSync(filePath));
        this.envConfig = this.validateInput(config);
    }

    /**
     * Ensures all needed variables are set, and returns the validated JavaScript object
     * including the applied default values.
     */
    private validateInput(envConfig: EnvConfig): EnvConfig {
        const envVarsSchema: Joi.ObjectSchema = Joi.object({
            NODE_ENV: Joi.string()
                .valid('development', 'production', 'test', 'provision')
                .default('development'),
            HOST: Joi.string().required(),
            PORT: Joi.number().required(),
            APP_URL: Joi.string().required(),
            CACHE_VIEWS: Joi.boolean().required(),
            APP_KEY: Joi.string().required(),
            SESSION_DRIVER: Joi.string().required(),
            HASH_DRIVER: Joi.string().required(),
            DB_HOST: Joi.string().required(),
            DB_USER: Joi.string().required(),
            DB_PASSWORD: Joi.string().required(),
            DB_PORT: Joi.number().required(),
            DB_DATABASE: Joi.string().required(),
            DB_SYNCHRONIZE: Joi.boolean().required(),
            URL: Joi.string().required(),
            CLIENT_URL: Joi.string().required(),

            SWAGGER_SCHEMA: Joi.string().required(),
            CLOUD_NAME: Joi.string().required(),
            API_KEY: Joi.string().required(),
            API_SECRET: Joi.string().required(),

            MONGODB_ADIDAS_URI: Joi.string().required(),
            MONGODB_NIKE_URI: Joi.string().required(),
            LIMIT_PAGE: Joi.number().required(),
        });

        const { error, value: validatedEnvConfig } = envVarsSchema.validate(
            envConfig,
        );
        if (error) {
            throw new Error(`Config validation error: ${error.message}`);
        }
        return validatedEnvConfig;
    }

    get dbHost(): string {
        return this.envConfig.DB_HOST;
    }

    get dbPort(): number {
        return parseInt(this.envConfig.DB_PORT, null);
    }

    get dbUser(): string {
        return this.envConfig.DB_USER;
    }

    get dbPass(): string {
        return this.envConfig.DB_PASSWORD;
    }

    get dbName(): string {
        return this.envConfig.DB_DATABASE;
    }

    get isSynchronize(): boolean {
        return Boolean(this.envConfig.DB_SYNCHRONIZE);
    }

}
