import type { RouteHandler } from "@hono/zod-openapi";
import type { listRoute } from "./tasks.routes.js";
import type { AppBindings } from "@/lib/types.js";

export const list: RouteHandler<listRoute, AppBindings> = (c) => {
  return c.json([{
    name: "learn hono",
    done: false
  },
  {
    name: "learn express",
    done: true
  }
  ])
}
