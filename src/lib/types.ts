import type { OpenAPIHono } from "@hono/zod-openapi";
import type { Schema } from "hono";
import type { PinoLogger } from "hono-pino";

export interface AppBindings {
  Variables: {
    logger: PinoLogger;
  };
}

export type AppOpenAPI<S extends Schema = {}> = OpenAPIHono<AppBindings, S>;
