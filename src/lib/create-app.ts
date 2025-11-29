import { OpenAPIHono } from "@hono/zod-openapi";
import { PinoLogger } from "hono-pino";
import { notFound, onError, serveEmojiFavicon } from "stoker/middlewares";

import { pinoLogger } from "@/middlewares/pino-logger.js";

import type { AppBindings } from "./types.js";
import { defaultHook } from "stoker/openapi";

export function createRouter() {
  return new OpenAPIHono<AppBindings>({ strict: false, defaultHook: defaultHook });
}
export default function createApp() {
  const app = createRouter();

  app.use(pinoLogger());
  app.use(serveEmojiFavicon("🔥"));
  app.onError(onError);
  app.notFound(notFound);
  app.onError(onError);
  return app;
}
