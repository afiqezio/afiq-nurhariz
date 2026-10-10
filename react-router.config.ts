import type { Config } from "@react-router/dev/config";
import { projectList } from "./src/data/projectList";

export default {
  appDirectory: "src",
  // Static hosting (GitHub Pages): no server at runtime, every page is
  // rendered to HTML at build time so crawlers get real content.
  ssr: false,
  // Listed without a trailing slash (a trailing slash fails to match the route
  // at pre-render time); each is still written to work/<id>/index.html, which
  // GitHub Pages serves at /work/<id>/ — the canonical form used by workPath.
  prerender: ["/", ...projectList.map((item) => `/work/${item.id}`)],
  // Explicitly stay on current v7 behavior (unset flags log a warning on
  // every dev/build run); revisit when upgrading to React Router v8.
  future: {
    v8_middleware: false,
    v8_splitRouteModules: false,
    v8_viteEnvironmentApi: false,
    v8_passThroughRequests: false,
    v8_trailingSlashAwareDataRequests: false,
  },
} satisfies Config;
