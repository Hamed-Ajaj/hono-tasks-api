import type { RouteHandler } from "@hono/zod-openapi";
import type { listRoute } from "./tasks.routes.js";
import type { AppBindings } from "@/lib/types.js";
import db from "@/db/index.js";

export const list: RouteHandler<listRoute, AppBindings> = async (c) => {
  const tasks = await db.query.tasks.findMany()
  return c.json(tasks)
}
