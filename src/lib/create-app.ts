

import { OpenAPIHono } from '@hono/zod-openapi';
import { notFound, onError, serveEmojiFavicon } from 'stoker/middlewares';
import { pinoLogger } from '@/middlewares/pino-logger.js';
import { PinoLogger } from 'hono-pino';
import type { AppBindings } from './types.js';

export default function createApp() {

  const app = new OpenAPIHono<AppBindings>({ strict: false })

  app.use(pinoLogger())
  app.use(serveEmojiFavicon("🔥"))
  app.onError(onError);
  app.notFound(notFound)
  app.onError(onError)
  return app;

}
