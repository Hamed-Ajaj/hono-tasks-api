import type { AppOpenApi } from "./types.js";

import packageJson from "../../package.json" with { type: "json" };
import { Scalar } from "@scalar/hono-api-reference";

export default function configureOpenApi(app: AppOpenApi) {
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: packageJson.version,
      title: "My API",
    },
  });

  app.get('/scalar', Scalar({
    url: '/doc', theme: 'kepler', layout: 'classic', defaultHttpClient: {
      targetKey: 'js',
      clientKey: "fetch"
    }
  }));
}
