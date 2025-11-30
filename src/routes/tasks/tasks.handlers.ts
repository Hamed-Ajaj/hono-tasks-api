import type { RouteHandler } from "@hono/zod-openapi";

import { eq } from "drizzle-orm";
import * as HttpStatusCodes from "stoker/http-status-codes";

import type { AppBindings } from "@/lib/types.js";

import db from "@/db/index.js";
import { tasks } from "@/db/schema.js";

import type {
  CreateRoute,
  GetOneRoute,
  listRoute,
  PatchRoute,
  RemoveRoute,
} from "./tasks.routes.js";

export const list: RouteHandler<listRoute, AppBindings> = async (c) => {
  const tasks = await db.query.tasks.findMany();
  return c.json(tasks);
};

export const create: RouteHandler<CreateRoute, AppBindings> = async (c) => {
  const task = c.req.valid("json");
  const [inserted] = await db.insert(tasks).values(task).returning();
  return c.json(inserted, HttpStatusCodes.OK);
};

export const getOne: RouteHandler<GetOneRoute, AppBindings> = async (c) => {
  const { id } = c.req.valid("param");
  const task = await db.query.tasks.findFirst({
    where(fields, operators) {
      return operators.eq(fields.id, id);
    },
  });

  if (!task) {
    return c.json({ message: "Task not found" }, HttpStatusCodes.NOT_FOUND);
  }

  return c.json(task, HttpStatusCodes.OK);
};

export const patch: RouteHandler<PatchRoute, AppBindings> = async (c) => {
  const { id } = c.req.valid("param");
  const updates = c.req.valid("json");

  if (Object.keys(updates).length === 0) {
    return c.json(
      {
        success: false,
        error: {
          issues: [
            {
              code: "invalid_updates",
              path: [],
              message: "No updates provided",
            },
          ],
          name: "ZodError",
        },
      },
      HttpStatusCodes.UNPROCESSABLE_ENTITY,
    );
  }

  const [task] = await db
    .update(tasks)
    .set(updates)
    .where(eq(tasks.id, id))
    .returning();

  if (!task) {
    return c.json(
      {
        message: "Task not found",
      },
      HttpStatusCodes.NOT_FOUND,
    );
  }

  return c.json(task, HttpStatusCodes.OK);
};

export const remove: RouteHandler<RemoveRoute, AppBindings> = async (c) => {
  const { id } = c.req.valid("param");
  const result = await db.delete(tasks).where(eq(tasks.id, id));

  if (result.rowsAffected === 0) {
    return c.json(
      {
        message: "Task not found",
      },
      HttpStatusCodes.NOT_FOUND,
    );
  }

  return c.body(null, HttpStatusCodes.NO_CONTENT);
};
