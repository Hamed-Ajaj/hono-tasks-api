
import { config } from 'dotenv'
import { expand } from 'dotenv-expand'

import z, { ZodError } from 'zod'
expand(config())

const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(5000),
  LOG_LEVEL: z.enum(['fatal', 'debug', 'info', 'warn', 'error']).default('info'),
})

export type env = z.infer<typeof EnvSchema>

let env: env;

try {

  env = EnvSchema.parse(process.env);
}
catch (e) {
  const error = e as ZodError
  console.error('❌ Invalid environment variables:');
  console.error(error.message)
  process.exit(1);
}

export default env;
