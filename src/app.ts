
import { OpenAPIHono } from '@hono/zod-openapi';
import { notFound, onError, serveEmojiFavicon } from 'stoker/middlewares';
import { pinoLogger } from './middlewares/pino-logger.js';
import { PinoLogger } from 'hono-pino';
import createApp from './lib/create-app.js';
import configureOpenApi from './lib/configure-open-api.js';

const app = createApp();
configureOpenApi(app);

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/error', (c) => {
  c.var.logger.info("Logging an error for testing purposes");
  throw new Error('This is a test error');
})

export default app;
