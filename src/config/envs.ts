import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  PRODUCTS_MICROSERVICE_HOST: string;
  PRODUCTS_MICROSERVICE_PORT: number;
}

const envsSchema: joi.ObjectSchema = joi
  .object({
    PORT: joi.number().default(3000),
    PRODUCTS_MICROSERVICE_HOST: joi.string().default('localhost'),
    PRODUCTS_MICROSERVICE_PORT: joi.number().default(3001),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config env validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  productsMicroServiceHost: envVars.PRODUCTS_MICROSERVICE_HOST,
  productsMicroServicePort: envVars.PRODUCTS_MICROSERVICE_PORT,
};
