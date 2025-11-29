import { createRouter } from "@/lib/create-app.js";
import { createRoute } from "@hono/zod-openapi";
import { z } from "zod/v4";

const router = createRouter().openapi(createRoute({
  tags: ['index'],
  method: 'get',
  path: '/',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
          })
        }
      },
      description: "Tasks api index"
    },
  },
}), (c) => {
  return c.json({ message: "Welcome to the Tasks API" });
})

export default router; 
