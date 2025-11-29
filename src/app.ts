import configureOpenApi from "./lib/configure-open-api.js";
import createApp from "./lib/create-app.js";
import index from "@/routes/index.route.js";
import tasks from "@/routes/tasks/tasks.index.js";

const app = createApp();
const routes = [
  index,
  tasks
]
configureOpenApi(app);
routes.forEach((route) => {
  app.route('/', route)
})

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/error", (c) => {
  c.var.logger.info("Logging an error for testing purposes");
  throw new Error("This is a test error");
});

export default app;
